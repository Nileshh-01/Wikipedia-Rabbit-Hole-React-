import "../App.css"

export const ArticleCard = ({type,article})=>{
    
    return(
        <div className={type}>

            <div id={type.concat("Text")} className="Text">
            <div id={type.concat("Title")}>{type}</div>
            <div id={type.concat("Description")}></div>
        </div>
        <img src="" />

        </div>
    )
    
}