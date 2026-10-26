import { useEffect, useState } from "react";
import { showRelLinks } from "../services/wikipediaApi"

export const ShowRelLinksBtn = ({title,handleArticleOnClick})=>{

    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isOpen, setIsopen] = useState(false);



    const show = async()=>{
        
        
    }

    useEffect(() => {
        if (!isOpen || !title) return;

        let cancelled = false;

        const fetchLinks = async () => {
            const articles = await showRelLinks(title);

            if (!cancelled) {
                setRelatedArticles(articles);
            }
        };

        fetchLinks();

        return () => {
            cancelled = true;
        };
    }, [title, isOpen]);
    return(
        <>
            <button onClick={()=>setIsopen((prev)=>!prev)} id="showRelLinksBtn">Related Links</button>

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