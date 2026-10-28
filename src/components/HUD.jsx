import { Difficulty } from "./Difficulty"

export const HUD = ({currDifficulty,handleDifficultyChange})=>{
    return(
       <div id="gameInfo">
         <Difficulty currDifficulty={currDifficulty} handleDifficultyChange={handleDifficultyChange}></Difficulty>
       </div>
    )
}