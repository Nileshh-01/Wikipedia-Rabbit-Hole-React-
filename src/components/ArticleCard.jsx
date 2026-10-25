import "../App.css"

export const ArticleCard = ({type,article,loading})=>{
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
            <img src={article?.thumbnail?.source || ""} alt={article?.title || ""} />
            <div id={titleIds[type]} className="Text">
                <div id={titleIds[type]} className="titles"> {article?.title || ""}  </div>
                <div id={descriptionIds[type]}> {article?.description} </div>
            </div>
        </div>
    )
}