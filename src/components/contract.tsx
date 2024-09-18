import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import GamesCard from "./games-card";
import { ContractChoice } from '@/types/games';
import { GamesContext, GamesContextType } from "@/context/games-context";

export default function Contract () {
    const [contract, setContract] = useState<ContractChoice | null>(null);
    const { game, setGame } = useContext(GamesContext) as GamesContextType;

    function onChange (event: React.MouseEvent<HTMLElement>, value: ContractChoice) {
        if (value !== null) {
            event.preventDefault();
            setContract(value);
        }
    }

    useEffect(() => {
        if (contract !== null) {
            let localGame = game;
            localGame.updateContract(contract);
            localGame.updateScore();
            setGame ({...localGame});
        } 
    }, [contract]);

    return (
        <GamesCard title={"Qui a pris ?"} >
            <ToggleButtonGroup exclusive value={contract} onChange={onChange} color='primary'>
                <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                    <ToggleButton value={1} >Equipe 1</ToggleButton>
                    <ToggleButton value={2} >Equipe 2</ToggleButton>
                </Stack>
            </ToggleButtonGroup>
        </GamesCard>
    );
}