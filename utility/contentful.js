import compress from "gql-compress";

export async function getMultipleEntries(query) {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  console.warn(query);
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}/environments/master`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        // throw our query (a string) into the body directly
        body: JSON.stringify({
          query: compress(query),
        }),
      }
    );
    const data = await res.json();
    console.warn(data);

    return data;
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    );
    //console.error(error);
  }
}

export default getMultipleEntries;
