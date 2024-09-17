import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

type Belote = 1 | 2 | 0

export default function Belote () {
    const [belote, setBelote] = useState<Belote>(0);

    function onChange (event: React.MouseEvent<HTMLElement>, value: Belote) {
        event.preventDefault();
        setBelote(value);
    }

    return (
        <Stack>
            <ToggleButtonGroup exclusive value={belote} onChange={onChange} color='primary'>
                <ToggleButton value={1} >Equipe 1</ToggleButton>
                <ToggleButton value={0} >Aucune</ToggleButton>
                <ToggleButton value={2} >Equipe 2</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
}