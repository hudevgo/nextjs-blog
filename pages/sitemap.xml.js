const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

function generateSiteMap(posts){
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      <url>
        <loc>https://jsonplaceholder.typicode.com</loc>
      </url>
      <url>
        <loc>https://jsonplaceholder.typicode.com/guide</loc>
      </url>
      ${posts.map((post) => {
        return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/${post.id}`}</loc>    
        </url>
        `;
      })
      .join('')}
    </urlset>
    `;
}


function SiteMap(){

}

export async function getServerSideProps({res}){
    const request = await fetch(EXTERNAL_DATA_URL);
    const posts = await request.json();

    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    res.write(siteMap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;