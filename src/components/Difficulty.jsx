import { useState } from "react"

export const Difficulty = ({currDifficulty, handleDifficultyChange})=>{
    

    return(
        <div id="gameMode">
            <div id="gameModeText">Select difficulty</div>
            <div id="difficulty">
                <button onClick={()=>handleDifficultyChange("easy")} className="difficultyBtns">Easy</button>
                <button onClick={()=>handleDifficultyChange("medium")} className="difficultyBtns">Medium</button>
                <button onClick={()=>handleDifficultyChange("hard")} className="difficultyBtns">Hard</button>
            </div>
        </div>
    )
}