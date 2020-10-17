const fs = require('fs');
 
const prettier = require('prettier');
fs.readFile("./data/seller-data.json",async (err,data) => {
    if(err) {
        console.log(err)
    } 
    
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
    const sitemap = `
            <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${JSON.parse(data.toString()).map((page) => {  
                    return `
                            <url>
                                <loc>${`https://www.elocals.in/s/${page["Store Name"].split(" ").join("-").split("/").join("-")}/${page.ID}`}</loc>
                                <lastmod>2020-10-10</lastmod>
                                <changefreq>weekly</changefreq>
                                <priority>0.7</priority>
                            </url>
                        `;
                })
                .join('')}
            </urlset>
        `;

    // If you're not using Prettier, you can remove this.
    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html'
    });

    fs.writeFileSync('./sitemaps/seller-sitemap.xml', formatted);

})
 
