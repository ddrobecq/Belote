'use client';

import { useState } from "react";
import { Button, Stack } from "@mui/material";
import ScoreDialog from "@/app/score/score-dialog";
import ScoreContextProvider from "@/app/score/components/score-context";
import { IScore } from "@/logic/scores";
import { Game } from "@/logic/game";
import ScoresTable from "./components/scores-table";

export default function Page() {
    const [ game, setGame ] = useState<Game>(new Game());
    const [ openScore, setOpenScore ] = useState(false);

    function openScoreDialog() {
        setOpenScore(true);
    }

    function closeScoreDialog(score:IScore) {
        setOpenScore(false);
        const tempScore:IScore = {...score, team1: {...score.team1}, team2: {...score.team2}};
        const newScores = [...game.scores, {...tempScore}];
        const newGame = new Game(game);
        newGame.scores = [...newScores];
        //Calculate the total scores
        newGame.team1.total = newGame.scores.reduce((acc, score) => acc + score.team1.score, 0);
        newGame.team2.total = newGame.scores.reduce((acc, score) => acc + score.team2.score, 0);
        //Update the game
        setGame({...newGame});
    }

    return (
        <Stack direction={'column'} spacing={1}>
            <ScoresTable game={game} />
            <Button onClick={openScoreDialog}>Nouveau score</Button>
            <ScoreContextProvider >
                <ScoreDialog open={openScore} onClose={closeScoreDialog} />
            </ScoreContextProvider>
        </Stack>
    );
} 