import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import GamesCard from "./games-card";
import { DerChoice } from '@/types/games';
import { GamesContext, GamesContextType } from "@/context/games-context";

export default function Der () {
    const [der, setDer] = useState<DerChoice | null>(null);
    const { game, setGame } = useContext(GamesContext) as GamesContextType;

    useEffect(() => {
        if (der !== null) {
            let localGame = game;
            localGame.updateDer(der);
            localGame.updateScore();
            setGame ({...localGame});
        } 
    }, [der]);

    function onChange (event: React.MouseEvent<HTMLElement>, value: DerChoice) {
        if (value !== null) {
            event.preventDefault();
            setDer(value);
        }
    }

    return (
        <GamesCard title={"Qui a remporté le Dix de Der ?"} >
            <ToggleButtonGroup exclusive value={der} onChange={onChange} color='primary'>
                <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                    <ToggleButton value={1} >Equipe 1</ToggleButton>
                    <ToggleButton value={2} >Equipe 2</ToggleButton>
                </Stack>
            </ToggleButtonGroup>
        </GamesCard>
    );
}