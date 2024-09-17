import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import TricksCard from "./tricks-card";

type Bid = 1 | 2

export default function Bid () {
    const [bid, setBid] = useState<Bid | null>(null);

    function onChange (event: React.MouseEvent<HTMLElement>, value: Bid) {
        event.preventDefault();
        setBid(value);
    }

    return (
        <TricksCard title={"Qui a pris ?"} >
            <ToggleButtonGroup exclusive value={bid} onChange={onChange} color='primary'>
                <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                    <ToggleButton value={1} >Equipe 1</ToggleButton>
                    <ToggleButton value={2} >Equipe 2</ToggleButton>
                </Stack>
            </ToggleButtonGroup>
        </TricksCard>
    );
}