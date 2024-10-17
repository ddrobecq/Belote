import React from "react";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ScoreCard from "@/app/score/components/score-card";
import { DerChoice } from '@/logic/scores';
import { ScoreContext, ScoreContextType } from "@/app/score/components/score-context";

export default function Der () {
	const [der, setDer] = useState<DerChoice | null>(null);
	const { score, setScore } = useContext(ScoreContext) as ScoreContextType;

	useEffect(() => {
		if (der !== null) {
			const localScore = score;
			localScore.updateDer(der);
			localScore.updateScore();
			setScore ({...localScore});
		} 
	}, [der]);

	function onChange (event: React.MouseEvent<HTMLElement>, value: DerChoice) {
		if (value !== null) {
			event.preventDefault();
			setDer(value);
		}
	}

	return (
		<ScoreCard title={"Qui a remporté le Dix de Der ?"} >
			<ToggleButtonGroup exclusive value={der} onChange={onChange} color='primary'>
				<Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
					<ToggleButton value={1} >{score.team1.name}</ToggleButton>
					<ToggleButton value={2} >{score.team2.name}</ToggleButton>
				</Stack>
			</ToggleButtonGroup>
		</ScoreCard>
	);
}