import { Difficulty } from "./Difficulty"
import { GameStatus } from "./GameStatus"

export const HUD = ({currDifficulty, handleDifficultyChange, rabbitHoleDepth, allowedDepth, handleRestart})=>{
    return(
       <div id="gameInfo">
         <Difficulty currDifficulty={currDifficulty} handleDifficultyChange={handleDifficultyChange}></Difficulty>
         <GameStatus rabbitHoleDepth={rabbitHoleDepth} allowedDepth={allowedDepth} handleRestart={handleRestart}></GameStatus>
       </div>
    )
}