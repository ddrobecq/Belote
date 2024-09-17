import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import TricksCard from "./tricks-card";

type Belote = 1 | 2 | 0

export default function Belote () {
    const [belote, setBelote] = useState<Belote>(0);

    function onChange (event: React.MouseEvent<HTMLElement>, value: Belote) {
        event.preventDefault();
        setBelote(value);
    }

    return (
        <TricksCard title={'Quelle équipe a annoncé la Belote ?'}>
            <ToggleButtonGroup exclusive value={belote} onChange={onChange} color='primary'>
                <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                    <ToggleButton value={1} >Equipe 1</ToggleButton>
                    <ToggleButton value={0} >Aucune</ToggleButton>
                    <ToggleButton value={2} >Equipe 2</ToggleButton>
                </Stack>
            </ToggleButtonGroup>
        </TricksCard>
    );
}