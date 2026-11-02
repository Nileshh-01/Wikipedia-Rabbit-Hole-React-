export const GameResultPopup = ({ gameStatus, rabbitHoleDepth, handleRestart }) => {
    return (
        <>
            <div
                id="lostPopup"
                style={{ display: gameStatus === "lost" ? "flex" : "none" }}
            >
                <div id="lostBox">
                    <h2>You Lost</h2>

                    <p>You reached the maximum rabbit hole depth.</p>

                    <button id="restartLost" onClick={handleRestart}>
                        Restart Game
                    </button>
                </div>
            </div>

            <div
                id="wonPopup"
                style={{ display: gameStatus === "won" ? "flex" : "none" }}
            >
                <div id="wonBox">
                    <h2>You Won!</h2>

                    <p>
                        You reached the target article in{" "}
                        <span id="step">{rabbitHoleDepth}</span> steps.
                    </p>

                    <button id="restartWon" onClick={handleRestart}>
                        Play Again
                    </button>
                </div>
            </div>
        </>
    );
};