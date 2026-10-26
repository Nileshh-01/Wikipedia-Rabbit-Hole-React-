import { useState } from "react";
import { showRelLinks } from "../services/wikipediaApi"

export const ShowRelLinksBtn = ({title,handleArticleOnClick})=>{

    const [relatedArticles, setRelatedArticles] = useState([]);

    const show = async()=>{
        const articles = await showRelLinks(title);
        setRelatedArticles(articles);
    }

    return(
        <>
            <button onClick={show}>Related Links</button>

            <div id="currRelLinks">{
                relatedArticles.map((article, index) => {
                const angle = (2 * Math.PI * index) / relatedArticles.length;

                const x = 300 * Math.cos(angle);
                const y = 260 * Math.sin(angle);

                return (
                    <button
                        key={article.title}
                        className="relLinkBtns"
                        style={{
                            left: `${x}px`,
                            top: `${y}px`
                        }}
                        onClick={() => handleArticleOnClick(article)}
                    >
                        {article.title}
                    </button>
                );
                })}
            </div>
        </>
        
    )
}