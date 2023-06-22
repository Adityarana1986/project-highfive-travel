import compress from "gql-compress";
import styles from "../styles/Home.module.css";
import getMultipleEntries from "../utility/contentful";
import TravelCard from "../component/TravelCard";
import Nav from "../component/Nav";
import Image from "next/image";
import FooterLinks from "../component/FooterLinks";

export async function getStaticProps() {
  const query = `query{
    landingPageCollection(limit:5){
      items{
        sys{
          id
        }
        internalTitle
        landingPageImages{
          title
          smallDescription
          bannerImage{
            title
            url
            description
            width
            height
          }
        }
        travelToursCollection{
          items{
            tourName
            cta{
              slug
            }
            destinationImage{
              title
              url
              description
            }
            duration
            destination
          }
        }
      }
    }
    }`;
  const { data } = await getMultipleEntries(query);
  const response = data.landingPageCollection.items;

  //console.warn(data);
  
  return {
    props: {
      response,
    },
  };
}

export default function Home({ response }) {
  return (
    <div className="items-center justify-center bg-indigo-100">
      <div className="container mx-auto">
        {response.map((item) => (
          <div key={item.sys.id} className="mb-10">
            <Nav />
            <div className="flex px-5 bg-indigo-100 md:py-12">
              <div className="container items-center px-4 mx-auto text-center">
                <Image
                  src={item.landingPageImages?.bannerImage.url}
                  className="mx-auto"
                  alt={item.landingPageImages?.bannerImage.title}
                  width={item.landingPageImages?.bannerImage.width}
                  height={item.landingPageImages?.bannerImage.height}
                />

<h1 className="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">Trip Packages</h1>
                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 max-w-none">
                  {item.travelToursCollection?.items.map((itemdata, index) => (
                    <TravelCard key={index} travelcard={itemdata}></TravelCard>
                  ))}
                </div>
              </div>{" "}
            </div>
          </div>
        ))}
      </div>
      <FooterLinks></FooterLinks>
         </div>
    
  );
}
