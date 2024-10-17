'use client';

import React, { useContext, useState } from "react";
import { Button, Stack } from "@mui/material";
import ScoreDialog from "@/app/score/score-dialog";
import ScoreContextProvider from "@/app/score/components/score-context";
import { Score } from "@/logic/scores";
import ScoresTable from "@/app/game/components/scores-table";
import { GameContext, GameContextType } from '@/app/game/components/game-context';

export default function GameScoreCard() {
	const { game, setGame } = useContext(GameContext) as GameContextType;
	const [ openScore, setOpenScore ] = useState(false);

	function openScoreDialog() {
		setOpenScore(true);
	}

	function closeScoreDialog(score:Score | null) {
		setOpenScore(false);
		if (score) {
			const tempScore:Score = {...score, team1: {...score.team1}, team2: {...score.team2}};
			const newScores = [...game.scores, {...tempScore}];
			let newGame = game;
			newGame = game;
			newGame.scores = [...newScores];
			//Calculate the total scores
			newGame.calculateTotalScores();
			//Update the game
			setGame ({...newGame, scores: [...newGame.scores]});
		}
	}

	return (
		<Stack direction={'column'} spacing={1}>
			<ScoresTable game={game} />
			<Button onClick={openScoreDialog}>Nouveau score</Button>
			{(openScore) &&
				<ScoreContextProvider team1={game.team1.name} team2={game.team2.name} >
					<ScoreDialog open={openScore} onClose={closeScoreDialog} />
				</ScoreContextProvider>
			}
		</Stack>
	);
} 