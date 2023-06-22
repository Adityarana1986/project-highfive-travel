import { useRouter } from "next/router";
import getMultipleEntries from "../utility/contentful";
import RichTextComponent from "../component/Richtext";
import Nav from "../component/Nav";
import FooterLinks from "../component/FooterLinks";
import Image from "next/image";

export async function getStaticPaths() {
  const query = `query {
    pageCollection{
          items{
            slug
          }
        }
       
      }`;
  const { data } = await getMultipleEntries(query);

  const slugs = data.pageCollection.items; // Replace with your actual list of slugs

  // Map the slugs to the `params` object required by Next.js
  const slugpath = slugs.map((item) => item.slug);
  const paths = slugpath.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false, // Set to `false` if all possible slugs are known in advance
  };
}
export async function getStaticProps({ params }) {
  const pageslug = params.slug;
  //.warn(params.slug, "pageslug");
  //  const router = useRouter();
  //  const { slug } = router.query;
  const query2 = `query ($pageslug: String){
    pageCollection(where:{slug:$pageslug}){
      items{
        sys{
            id
        }
        slug
        banner{
          title
          smallDescription
          bannerImage{
            url
            size
            width
            height
          }
        }
        internalTitle
        content{
          json
        }
        
      }
    }
    }`;
  const { data } = await getMultipleEntries(query2);

  const pageContent = data.pageCollection.items.find(
    (item) => item.slug === params.slug
  );

  //.log(pageContent);
  return {
    props: {
      pageContent,
    },
  };
}

function page({ pageContent }) {
  const { sys, slug, banner, internalTitle, content } = pageContent;

  return (
    <div className="items-center justify-center bg-indigo-100">
      <div className="container mx-auto">
        <Nav />
        <div className="w-full px-5 prose max-w-none">

        <div>
          <Image src={banner.bannerImage?.url} width={banner.bannerImage?.width} height={banner.bannerImage?.height} alt={banner.bannerImage?.title}/>
        </div>
        <h1 className="text-3xl font-bold"> {internalTitle}</h1>
        <div>
          <RichTextComponent content={content.json} />
        </div>
   
        </div>
      </div>
      <FooterLinks/>
    </div>
  );
}
export default page;
