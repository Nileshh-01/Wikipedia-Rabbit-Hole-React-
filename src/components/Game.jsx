import { useState } from "react";
import { setEndPoints, getRandomValidArticle } from "../services/wikipediaApi";


export const Game = async ()=>{
    setLoading(true);
    const [startArticle, setStartArticle] = useState(null);
    const [currArticle, setCurrArticle] = useState(null);
    const [targetArticle, setTargetArticle] = useState(null);

    const [visitedArticles, setVisitedArticles] = useState([]);
    const [rabbitHoleDepth, setRabbitHoleDepth] = useState(0);

    try{
        const titles = setEndPoints();

        const start = await getRandomValidArticle(titles);
        const end = await getRandomValidArticle(titles,titles[stIdx],true);

        setStartArticle(start);
        setCurrArticle(start);
        setTargetArticle(end);
        setVisitedArticles([start]);
        setRabbitHoleDepth(0);

    } catch (error) {
        console.error("Error loading articles:", error);
    } finally {
        setLoading(false);
    }
}