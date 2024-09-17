import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import TricksCard from "./tricks-card";

type Der = 1 | 2

export default function Der () {
    const [der, setDer] = useState<Der | null>(null);

    function onChange (event: React.MouseEvent<HTMLElement>, value: Der) {
        event.preventDefault();
        setDer(value);
    }

    return (
        <TricksCard title={"Qui a remporté le Dix de Der ?"} >
            <ToggleButtonGroup exclusive value={der} onChange={onChange} color='primary'>
                <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                    <ToggleButton value={1} >Equipe 1</ToggleButton>
                    <ToggleButton value={2} >Equipe 2</ToggleButton>
                </Stack>
            </ToggleButtonGroup>
        </TricksCard>
    );
}