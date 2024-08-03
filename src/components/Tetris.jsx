import React from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { useState } from "react";
import { createStage } from "../gameHelpers";
import { checkCollision } from "../gameHelpers";
import { useSwipeable } from 'react-swipeable';

// styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetrisWrapper";

// custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer()
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

    const moveplayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 })
        }
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
        setDropTime(1000);

        setScore(0)
        setRows(0)
        setLevel(0)
    }

    const drop = () => {
        // increase level when 10 rows are cleared
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1)
            setDropTime(1000 / (level + 1) + 200)
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        } else {
            if (player.pos.y < 1) {
                console.log("GAME OVER!!!");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropplayer = () => {
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        console.log(keyCode)
        if (!gameOver) {
            if (keyCode === 37) {
                moveplayer(-1);
            } else if (keyCode === 39) {
                moveplayer(1);
            } else if (keyCode === 40) {
                dropplayer();
            } else if (keyCode === 38) {
                rotatePlayer(stage, 1);
            }
        }
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (gameOver) return;
            moveplayer(-1);
        },
        onSwipedRight: () => {
            if (gameOver) return;
            moveplayer(1);
        },
        onSwipedUp: () => {
            if (gameOver) return;
            rotatePlayer(stage, 1);
        },
        onSwipedDown: () => {
            if (gameOver) return;
            dropplayer();
            if (!gameOver) {
                setDropTime(1000 / (level + 1) + 200);
            }
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <div {...handlers}>
            <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
                <StyledTetris className="flex-col items-center relative">
                    <div className="flex flex-col md:flex-row">
                        <Display text={`Level : ${level}`} />
                        <Display text={`Score : ${score}`} />
                        <Display text={`Rows : ${rows}`} />
                    </div>
                    <Stage className="sm:w-32 sm:h-100" stage={stage} />
                    {
                        gameOver ? (
                            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
                                <Display gameover={gameOver ? "true" : "false"} text="Game Over" />
                            </div>
                        ) : (<></>)
                    }
                    <StartButton className="relative" callback={startGame} />
                </StyledTetris>
            </StyledTetrisWrapper>
        </div>
    )
}

export default Tetris;