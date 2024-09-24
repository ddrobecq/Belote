import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ScoreCard from "@/app/score/components/score-card";
import { ContractChoice, initScore } from '@/logic/scores';
import { ScoreContext, ScoreContextType } from "@/app/score/components/score-context";

export default function Contract () {
    const [contract, setContract] = useState<ContractChoice | null>(null);
    const { score, setScore } = useContext(ScoreContext) as ScoreContextType;

    function onChange (event: React.MouseEvent<HTMLElement>, value: ContractChoice) {
        if (value !== null) {
            event.preventDefault();
            setContract(value);
        }
    }

    useEffect(() => {
        if (contract !== null) {
            let localScore = initScore (score);
            localScore.updateContract(contract);
            localScore.updateScore();
            setScore ({...localScore});
        } 
    }, [contract]);

    return (
        <ScoreCard title={"Qui a pris ?"} >
            <ToggleButtonGroup exclusive value={contract} onChange={onChange} color='primary'>
                <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                    <ToggleButton value={1} >Equipe 1</ToggleButton>
                    <ToggleButton value={2} >Equipe 2</ToggleButton>
                </Stack>
            </ToggleButtonGroup>
        </ScoreCard>
    );
}