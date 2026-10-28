import { DepthHandler } from "./DepthHandler"
import { Restart } from "./Restart"

export const GameStatus = ({rabbitHoleDepth,allowedDepth,handleRestart})=>{
    return(
        <div id="gameStatus">
            <DepthHandler rabbitHoleDepth={rabbitHoleDepth} allowedDepth={allowedDepth}></DepthHandler>
            <Restart handleRestart={handleRestart}></Restart>
        </div>
    )
}