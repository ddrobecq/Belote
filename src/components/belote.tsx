import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ScoreCard from "./score-card";
import { BeloteChoice } from '@/types/scores';
import { ScoreContext, ScoreContextType } from "@/context/score-context";

export default function Belote () {
    const [belote, setBelote] = useState<BeloteChoice>(0);
    const { score, setScore } = useContext(ScoreContext) as ScoreContextType;

    function onChange (event: React.MouseEvent<HTMLElement>, value: BeloteChoice) {
        if (value !== null) {
            event.preventDefault();
            setBelote(value);
        }
    }

    useEffect(() => {
        let localScore = score;
        localScore.updateBelote(belote);
        localScore.updateScore();
        setScore({...localScore});
    }, [belote]);

    return (
        <ScoreCard title={'Quelle équipe a annoncé la Belote ?'}>
            <ToggleButtonGroup exclusive value={belote} onChange={onChange} color='primary'>
                <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                    <ToggleButton value={1} >Equipe 1</ToggleButton>
                    <ToggleButton value={0} >Aucune</ToggleButton>
                    <ToggleButton value={2} >Equipe 2</ToggleButton>
                </Stack>
            </ToggleButtonGroup>
        </ScoreCard>
    );
}