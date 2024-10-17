import React from "react";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ScoreCard from "@/app/score/components/score-card";
import { CapotChoice } from '@/logic/scores';
import { ScoreContext, ScoreContextType } from "@/app/score/components/score-context";

export default function Capot () {
	const [ capot, setCapot ] = useState<CapotChoice>(0);
	const { score, setScore } = useContext(ScoreContext) as ScoreContextType;

	function onChange (event: React.MouseEvent<HTMLElement>, value: CapotChoice) {
		if (value !== null) {
			event.preventDefault();
			setCapot(value);
		}
	}

	useEffect(() => {
		if (capot !== null) {
			const localScore = score;
			localScore.updateCapot(capot);
			localScore.updateScore();
			setScore ({...localScore});
		} 
	}, [capot]);

	return (
		<ScoreCard title={"Une équipe a remporté un capot ?"} >
			<ToggleButtonGroup exclusive value={capot} onChange={onChange} color='primary'>
				<Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
					<ToggleButton value={1} >{score.team1.name}</ToggleButton>
					<ToggleButton value={0} >Aucune</ToggleButton>
					<ToggleButton value={2} >{score.team2.name}</ToggleButton>
				</Stack>
			</ToggleButtonGroup>
		</ScoreCard>
	);
}