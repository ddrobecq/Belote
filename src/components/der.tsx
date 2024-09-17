import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

type Der = 1 | 2

export default function Der () {
    const [der, setDer] = useState<Der | null>(null);

    function onChange (event: React.MouseEvent<HTMLElement>, value: Der) {
        event.preventDefault();
        setDer(value);
    }

    return (
        <Stack>
            <ToggleButtonGroup exclusive value={der} onChange={onChange} color='primary'>
                <ToggleButton value={1} >Equipe 1</ToggleButton>
                <ToggleButton value={2} >Equipe 2</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
}