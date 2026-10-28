export const DepthHandler = ({rabbitHoleDepth,allowedDepth})=>{
    
    let percentage = (rabbitHoleDepth / allowedDepth) * 100;
    return(
        <div >
            <div className="depthInfo">
                    <span>RABBIT HOLE</span>
                    <strong><span id="depth">{rabbitHoleDepth}</span> 
                    {" / "}
                    <span id="maxDepth">{allowedDepth}</span></strong>
                </div>

                <div id="depthBar">
                    <div id="depthProgress" style={{width: `${percentage}%`}}></div>
            </div>
        </div>
    )
}