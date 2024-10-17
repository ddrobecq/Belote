import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material"
import { Team } from "@/logic/game";
import UserAvatar from "@drobs/users/avatar";
import DialogTeam from "@/app/game/components/dialog-team";

type ScoresTeamProps = {
	id: number
    team: Team
	onChange: (_id:number, _newTeam:Team) => void
}

export default function ScoresTeam(props:ScoresTeamProps) {
	const url = process.env.NEXT_PUBLIC_USERS_API_URL as string;
	const [openTeam, setOpenTeam] = useState(false);
	const [team, setTeam] = useState(props.team);

	function closeDialogTeam(newTeam:Team | null):void {
		if (newTeam) {
			setTeam(newTeam);
		}
		setOpenTeam(false);
	}

	function openDialogTeam() {
		setOpenTeam(true);
	}

	useEffect(() => {
		props.onChange(props.id, team);
	}, [team]);

	return (
		<Stack>
			<Button onClick={openDialogTeam} disabled={(team === undefined)} >
				<Stack alignItems={'center'} >
					<Typography variant="h2">{props.team.name}</Typography>
					<Stack direction={'row'} spacing={-1} >
						<UserAvatar url={url} id={props.team.player1Id} size={'small'} />
						<UserAvatar url={url} id={props.team.player2Id} size={'small'} />
					</Stack>
				</Stack>
			</Button>
			<DialogTeam open={openTeam} team={props.team} onClose={closeDialogTeam} />
		</Stack>
	);
}

