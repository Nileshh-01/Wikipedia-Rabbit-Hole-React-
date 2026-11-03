import { useState } from "react";
import { getPopularArticles, getRandomValidArticle } from "../services/wikipediaApi";
import { ArticleCard } from "./ArticleCard";
import { useEffect } from "react";
import { showRelLinks } from "../services/wikipediaApi";
import { HUD } from "./HUD";
import { GameStatus } from "./GameStatus";
import { VisitedArticles } from "./VisitedArticles";
import { GameResultPopup } from "../GameResultPopUp";


export const Game = ()=>{
    const [startArticle, setStartArticle] = useState(null);
    const [currArticle, setCurrArticle] = useState(null);
    const [targetArticle, setTargetArticle] = useState(null);

    const [visitedArticles, setVisitedArticles] = useState([]);
    const [rabbitHoleDepth, setRabbitHoleDepth] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [relatedArticles, setRelatedArticles] = useState([]);

    const [currDifficulty, setCurrDifficulty] = useState("easy");

    const [gameStatus, setGameStatus] = useState("playing");

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
    
    const handleArticleOnClick = (article) => {
        if (gameStatus !== "playing") return;

        const nextDepth = rabbitHoleDepth + 1;

        setCurrArticle(article);
        setRabbitHoleDepth(nextDepth);

        setVisitedArticles(prev => [...prev, article]);

        if (article.title === targetArticle.title) {
            setGameStatus("won");
        } else if (nextDepth >= allowedDepth) {
            setGameStatus("lost");
        }
    };

    const allowedSteps = {
        easy: 30,
        medium: 20,
        hard: 10
    }
    const allowedDepth = allowedSteps[currDifficulty];
    const handleDifficultyChange = (difficulty)=>{

        if (difficulty === currDifficulty) return;

        setCurrDifficulty(difficulty);
        setRabbitHoleDepth(0);
        setCurrArticle(startArticle);
        setVisitedArticles(startArticle ? [startArticle] : []);
    }

    const handleRestart = ()=>{
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
                setGameStatus("playing");

            } catch (error) {
                console.error("Error loading articles:", error);
                setError("Failed to load articles. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        setEndpoints();
    }

    return(
        <div>
            <HUD currDifficulty={currDifficulty} handleDifficultyChange={handleDifficultyChange} rabbitHoleDepth={rabbitHoleDepth} allowedDepth={allowedDepth} handleRestart={handleRestart}></HUD>
            <ArticleCard type="start" article={startArticle} loading={loading} handleArticleOnClick={handleArticleOnClick}></ArticleCard>
            <ArticleCard type="curr" article={currArticle} loading={loading} handleArticleOnClick={handleArticleOnClick}></ArticleCard>
            <ArticleCard type="end" article={targetArticle} loading={loading} handleArticleOnClick={handleArticleOnClick}></ArticleCard>
            <VisitedArticles visitedArticles={visitedArticles}></VisitedArticles>
            <GameResultPopup gameStatus={gameStatus} rabbitHoleDepth={rabbitHoleDepth} handleRestart={handleRestart}/>
        </div>
    )
}