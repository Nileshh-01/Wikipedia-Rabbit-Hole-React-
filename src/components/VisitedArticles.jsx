import { useRef } from "react"
import { useEffect } from "react"

export const VisitedArticles = ({visitedArticles})=>{
    const visitedRef = useRef(null);
    
    useEffect(()=>{
        const visitedBox = visitedRef.current;

        if(visitedBox){
            visitedBox.scrollTo({left: visitedBox.scrollWidth, behavior: "smooth"});
        }
    },[visitedArticles])
    return(
        <div id="visitedWrapper">
            <div id="visitedHeading">YOUR PATH</div>
            <div id="visited" ref={visitedRef}>
                <div id="visitedItems">
                    {
                        visitedArticles.map((article)=> {
                            return <img src={article.thumbnail.source} className="visitedItem"/>
                        })
                    }
                </div>
            </div>

            <button id="collapseVisited">‹</button>
        </div>
    )
}