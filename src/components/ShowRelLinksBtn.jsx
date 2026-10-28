import { useEffect, useState } from "react";
import { showRelLinks } from "../services/wikipediaApi"

export const ShowRelLinksBtn = ({title,handleArticleOnClick})=>{

    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isOpen, setIsopen] = useState(false);
    const [phase, setPhase] = useState("hidden");
    const [count, setCount] = useState(0);

    
    useEffect(() => {
        if (!isOpen || !title){
            setPhase("hidden");
            setRelatedArticles([]);
            return;
        } 

        // if(count>)

        let cancelled = false;
        let timer;

        const fetchLinks = async () => {
            setPhase("loading");
            setRelatedArticles([]);
            const articles = await showRelLinks(title);

            if (cancelled) return;

            setRelatedArticles(articles);
            setPhase("lines");
            setCount((prev)=>prev+1);

            const animationTime =
                    600 + Math.max(0, articles.length - 1) * 50;

            timer = setTimeout(() => {
                if (!cancelled) {
                    setPhase("buttons");
                }
            }, animationTime);
        };

        fetchLinks();

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };

    }, [title, isOpen]);
    return(
        <>
            <button onClick={()=>setIsopen((prev)=>!prev)} id="showRelLinksBtn">Related Links</button>

             {isOpen && (
                <div id="currRelLinks">
                    <svg className="linkLines" aria-hidden="true">
                        {relatedArticles.map((article, index) => {
                            const angle =(2 * Math.PI * index) /relatedArticles.length;

                            const x = 300 * Math.cos(angle);
                            const y = 260 * Math.sin(angle);

                            return (
                                <line key={article.title} x1="0" y1="0" x2={x} y2={y} pathLength="1" className="drawLine"
                                    style={{
                                        animationDelay: `${index * 50}ms`
                                    }}
                                />
                            );
                        })}
                    </svg>

                    {relatedArticles.map((article, index) => {
                        const angle = (2 * Math.PI * index) / relatedArticles.length;

                        const x = 300 * Math.cos(angle);
                        const y = 260 * Math.sin(angle);

                        return (
                            <button key={article.title} className={`relLinkBtns ${
                                    phase === "buttons" ? "visible" : ""
                                }`}
                                style={{
                                    left: `${x}px`,
                                    top: `${y}px`,
                                    transitionDelay:
                                        phase === "buttons"
                                            ? `${index * 60}ms`
                                            : "0ms"
                                }}
                                onClick={() => handleArticleOnClick(article)}
                            >
                                {article.title}
                            </button>
                        );
                    })}
                </div>
            )}
        </>
    );
};