import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import GamesCard from "./games-card";
import { BeloteChoice } from '@/types/games';
import { GamesContext, GamesContextType } from "@/context/games-context";

export default function Belote () {
    const [belote, setBelote] = useState<BeloteChoice>(0);
    const { game, setGame } = useContext(GamesContext) as GamesContextType;

    function onChange (event: React.MouseEvent<HTMLElement>, value: BeloteChoice) {
        if (value !== null) {
            event.preventDefault();
            setBelote(value);
        }
    }

    useEffect(() => {
        let localGame = game;
        localGame.updateBelote(belote);
        localGame.updateScore();
        setGame({...localGame});
    }, [belote]);

    return (
        <GamesCard title={'Quelle équipe a annoncé la Belote ?'}>
            <ToggleButtonGroup exclusive value={belote} onChange={onChange} color='primary'>
                <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                    <ToggleButton value={1} >Equipe 1</ToggleButton>
                    <ToggleButton value={0} >Aucune</ToggleButton>
                    <ToggleButton value={2} >Equipe 2</ToggleButton>
                </Stack>
            </ToggleButtonGroup>
        </GamesCard>
    );
}