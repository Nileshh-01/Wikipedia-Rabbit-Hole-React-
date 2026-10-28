const n = 12;

// export const getPopularArticles = async ()=>{

//     const date = new Date();
//     date.setDate(1);
//     date.setMonth(date.getMonth() - 1);

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");

//     let response = await fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia.org/all-access/${year}/${month}/all-days`);
//     let data = await response.json();

//     return data.items[0].articles.map(x=>x.article.replaceAll("_"," "));
// }


export const getPopularArticles = async () => {
    const date = new Date();

    date.setDate(1);
    date.setMonth(date.getMonth() - 1);

    // 6 previous months
    for (let i = 0; i < 6; i++) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");

        const response = await fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia.org/all-access/${year}/${month}/all-days`);

        if (response.ok) {
            const data = await response.json();
            const articles = data.items?.[0]?.articles;

            if (articles?.length) {
                return articles.map(article =>
                    article.article.replaceAll("_", " ")
                );
            }
        }

        // Try previous month
        date.setMonth(date.getMonth() - 1);
        console.log(date.getMonth());
    }

    throw new Error("Could not fetch popular Wikipedia articles.");
};



export async function getArticleSummary(title) {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);

    if (!response.ok) return null;

    const data = await response.json();

    if (!data.thumbnail || !data.description || data.type !== "standard") {
        return null;
    }

    return data;
}


export async function getRandomValidArticle(titles, excludedTitle = "", checkBacklinks = false) {
    const shuffledTitles = [...titles].sort(() => Math.random() - 0.5);

    for (const title of shuffledTitles) {
        const article = await getArticleSummary(title);

        if (!article || article.title === excludedTitle) {
            continue;
        }

        if (checkBacklinks && !(await hasEnoughBackLinks(article.title))) {
            continue;
        }

        return article;
    }
    throw new Error("Could not find a valid article.");
}
export async function hasEnoughBackLinks(title, minLinks=30) {
    let response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bltitle=${encodeURIComponent(title)}&bllimit=${minLinks}&blnamespace=0&format=json&origin=*`);
    let data = await response.json();

    return data.query.backlinks.length>=minLinks;
}



export let getRelLinks = async (currTitle) =>{
    let response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=links&titles=${encodeURIComponent(currTitle)}&plnamespace=0&pllimit=max&format=json&origin=*`);
    let relLinks = await response.json();


    return relLinks;
}


export let showRelLinks = async (title)=>{
    // currRelLinks.replaceChildren();
    let relLinks = await getRelLinks(title);

    let pageid = Object.values(relLinks.query.pages)[0];
    // console.log(relLinks);

    let titles = pageid.links.map(link=>link.title);
    titles.sort(()=>{
        return Math.random()-0.5;
    })

  
    titles = titles.slice(0,20);
    const titleString = titles.join("|");
    let response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&titles=${encodeURIComponent(titleString)}&pilimit=30&piprop=thumbnail&pithumbsize=300&wbptterms=description&redirects=&origin=*`);
    let data = await response.json();

    // console.log(data);
    let validTitles = data.query.pages.filter(article => article.thumbnail?.source && article.terms?.description?.[0]);
    validTitles = validTitles.slice(0, n);

    return validTitles;
}