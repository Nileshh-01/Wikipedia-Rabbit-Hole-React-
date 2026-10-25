import { useState } from "react";
import { getPopularArticles, getRandomValidArticle } from "../services/wikipediaApi";
import { ArticleCard } from "./ArticleCard";
import { useEffect } from "react";


export const Game = ()=>{
    const [startArticle, setStartArticle] = useState(null);
    const [currArticle, setCurrArticle] = useState(null);
    const [targetArticle, setTargetArticle] = useState(null);

    const [visitedArticles, setVisitedArticles] = useState([]);
    const [rabbitHoleDepth, setRabbitHoleDepth] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(()=>{
        const setEndpoints = async()=>{
            setLoading(true);
            setError("");
            try{
                const titles = await getPopularArticles();
                const start = await getRandomValidArticle(titles);
                const end = await getRandomValidArticle(titles,start.title,true);

                setStartArticle(start);
                setCurrArticle(start);
                setTargetArticle(end);
                setVisitedArticles([start]);
                setRabbitHoleDepth(0);

            } catch (error) {
                console.error("Error loading articles:", error);
                setError("Failed to load articles. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        setEndpoints();
    },[])
    

    return(
        <div>
            <ArticleCard type="start" article={startArticle} loading={loading}></ArticleCard>
            <ArticleCard type="curr" article={currArticle} loading={loading}></ArticleCard>
            <ArticleCard type="end" article={targetArticle} loading={loading}></ArticleCard>
        </div>
    )
}