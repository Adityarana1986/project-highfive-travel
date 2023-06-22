import { useRouter } from "next/router";
import getMultipleEntries from "../../utility/contentful";
import RichTextComponent from "../../component/Richtext";
import Nav from "../../component/Nav";
import FooterLinks from "../../component/FooterLinks";
import Image from "next/image";

export async function getStaticPaths() {
  const query = `query {
        pageDetailCollection{
          items{
            slug
          }
        }
       
      }`;
  const { data } = await getMultipleEntries(query);

  const slugs = data.pageDetailCollection.items; // Replace with your actual list of slugs

  // Map the slugs to the `params` object required by Next.js
  const slugpath = slugs.map((item) => item.slug);
  const paths = slugpath.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false, // Set to `false` if all possible slugs are known in advance
  };
}
export async function getStaticProps({ params }) {
  const mainslug = params.slug;
  // console.warn(params.slug, "mainslug");
  //  const router = useRouter();
  //  const { slug } = router.query;
  const query2 = `query($mainslug: String) {
    pageDetailCollection(where:{slug:$mainslug}){
      items{
        sys{
            id
        }
        banner{
          title
          url
          width
          height
        }
        title
        overview{
          json
        }
        detailDescription{
          json
        }
        price
        internalTitle
        slug
      }
    }
   
  }`;
  const { data } = await getMultipleEntries(query2);
//console.warn( data.pageDetailCollection.items,"ddddddddd");
  const detailpage = data.pageDetailCollection.items.find(
    (item) => item.slug === params.slug
  );

  //console.log(detailpage);
  return {
    props: {
      detailpage,
    },
  };
}

function Detailpage({ detailpage }) {
  const {
    sys,
    title,
    overview,
    detailDescription,
    price,
    banner,
    internalTitle,
  } = detailpage;

  return (
    <div className="items-center justify-center bg-indigo-100">
      <div className="container mx-auto">
        <Nav />
        <div className="w-full px-5 prose max-w-none">
          <div>
            <Image
              src={banner.url}
              width={banner.width}
              height={banner.height}
              alt={banner.title}
            />
          </div>
          <h1 className="text-3xl font-bold"> {title} - ${price}</h1>
          <div>
            <RichTextComponent content={overview.json} />
          </div>
          <div>
            <RichTextComponent content={detailDescription.json} />
          </div>
        </div>
      </div>
      <FooterLinks></FooterLinks>
    </div>
  );
}
export default Detailpage;
