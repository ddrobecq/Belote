import React, { useContext } from "react";
import { Game, Team } from "@/logic/game"
import { Score } from "@/logic/scores"
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material"
import ScoresTeam from "@/app/game/components/scores-teams";
import { GameContext, GameContextType } from "@/app/game/components/game-context";

type ScoresTableProps = {
    game: Game
}

export default function ScoresTable(props:ScoresTableProps) {
	const scores = props.game.scores;
	const team1 = props.game.team1;
	const team2 = props.game.team2;
	const { game, setGame } = useContext(GameContext) as GameContextType;

	function handleChangeTeam (id:number, newTeam:Team) {
		let newGame = game;
		if (id === 1) {
			newGame = {...game, team1: newTeam};
		} else {
			newGame = {...game, team2: newTeam};
		}
		setGame(newGame);
	}

	return (
		<Stack direction={'column'} spacing={2} >
			<Stack direction={'row'} justifyContent={'space-evenly'}>
				<ScoresTeam id={1} team={team1} onChange={handleChangeTeam} />
				<ScoresTeam id={2} team={team2} onChange={handleChangeTeam} />
			</Stack>
			<Stack >
				{scores.map ((score:Score, index:number) => {
					return (
						<Stack key={index} direction={'row'} justifyContent={'space-evenly'}>
							<ScoreBox score={score.team1.score} />
							<ScoreBox score={score.team2.score} />
						</Stack>
					);
				})
				}
			</Stack>
			<Divider />
			<Stack direction={'row'} justifyContent={'space-evenly'}>
				<ScoreBox score={props.game.team1.total} total best={(props.game.team1.total >= props.game.team2.total)} />
				<ScoreBox score={props.game.team2.total} total best={(props.game.team1.total <= props.game.team2.total)} />
			</Stack>
		</Stack>
	)
}

type ScoreBoxProps = {
    score: number
    total?: boolean
    best?: boolean
}
function ScoreBox (props:ScoreBoxProps) {
	const theme = useTheme();
	const color = props.total ? (props.best ? theme.palette.success.main : theme.palette.error.main) : theme.palette.primary.main;
	return (
		<Box sx={{ width: '100px', border: '1px solid white', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Typography variant="h1" color={color} >{props.score}</Typography>
		</Box>
	)
}