const fs = require('fs');
 
const prettier = require('prettier');
fs.readFile("./data/product-data.json",async (err,data) => {
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
                                <loc>
                                    ${`https://www.elocals.in/${page.productName.split(" ").join("-").split("/").join("-").split("&").join("and")}/${page.sellerId}/${page.productId}/${page.variantId}`}
                                </loc>
                                <lastmod>2020-10-10</lastmod>
                                <changefreq>weekly</changefreq>
                                <priority>0.6</priority>
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

    fs.writeFileSync('./sitemaps/product-sitemap.xml', formatted);

})
 
