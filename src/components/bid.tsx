import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

type Bid = 1 | 2

export default function Bid () {
    const [bid, setBid] = useState<Bid | null>(null);

    function onChange (event: React.MouseEvent<HTMLElement>, value: Bid) {
        event.preventDefault();
        setBid(value);
    }

    return (
        <Stack>
            <ToggleButtonGroup exclusive value={bid} onChange={onChange} color='primary'>
                <ToggleButton value={1} >Equipe 1</ToggleButton>
                <ToggleButton value={2} >Equipe 2</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
}