import React, { ChangeEvent, useState } from "react"
import { Team } from "@/logic/game"
import { Button, Dialog, DialogActions, DialogContent, OutlinedInput, Stack } from "@mui/material"
import UserInfo from "@drobs/users/info"
import UserSelectDialog from "@drobs/users/select"

type DialogTeamProps = {
	team: Team
	open: boolean
    onClose: (_newTeam:Team | null) => void
}

export default function DialogTeam(props:DialogTeamProps) {
    const [ team, setTeam ] = useState(props.team); 
    const [ openUserSelect, setOpenUserSelect ] = useState(false);
    const url = process.env.NEXT_PUBLIC_USERS_API_URL as string;

    function onClose() {
        props.onClose(team);
    }

    function onCancel() {
        props.onClose(null);
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.value;
        setTeam({...team, name: name}); 
    }

    function handleSelect() {
        setOpenUserSelect(true);
    }

    function closeUserSelect() {
        setOpenUserSelect(false);
    }

    function selectPlayer(id:number) {
        setTeam({...team, player1Id: id});
        closeUserSelect();
    }

	return (
        <Stack>
            <Dialog open={props.open} onClose={onClose} >
                <DialogContent>
                    <Stack spacing={1} alignItems={'start'} >
                        <OutlinedInput value={team.name} type={'string'} onChange={onChange} label={"Nom"} />
                        <Button onClick={handleSelect} >
                            <UserInfo url={url} id={team.player1Id} size={'small'} />
                        </Button>
                        <UserInfo url={url} id={team.player2Id} size={'small'} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color={'success'} >Valider</Button>
                    <Button onClick={onCancel} color={'error'} >Annuler</Button>
                </DialogActions>		
            </Dialog>
            <UserSelectDialog url={url} open={openUserSelect} onClose={closeUserSelect} onSelect={selectPlayer} />
        </Stack>
	);
}
