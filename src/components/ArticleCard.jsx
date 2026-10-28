import { useState } from "react"
import "../App.css"
import { ShowRelLinksBtn } from "./ShowRelLinksBtn"

export const ArticleCard = ({type,article,loading,handleArticleOnClick})=>{
    const [title, setTitle] = useState(article?.title);
    const textIds = {
        start: "startText",
        curr: "currText",
        end: "endText"
    }
    const titleIds = {
        start: "startTitle",
        curr: "currTitle",
        end: "endTitle"
    }
    const descriptionIds = {
        start: "startDescription",
        curr: "currDescription",
        end: "endDescription"
    }

    return(
        <div id={type} className="cards" >
            {article?.thumbnail?.source && (
                <img
                    src={article.thumbnail.source}
                    alt={article.title}
                />
                )}
            <div id={titleIds[type]} className="Text">
                <div id={titleIds[type]} className="titles"> {article?.title || ""}  </div>
                <div id={descriptionIds[type]}> {article?.description} </div>
            </div>
            {type=="curr" &&
                <>
                <ShowRelLinksBtn title={article?.title} handleArticleOnClick={handleArticleOnClick}></ShowRelLinksBtn> 
                </>
            }
        </div>
    )
}