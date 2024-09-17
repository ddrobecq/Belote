import { Suit } from '@/cards';
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';

export default function Trump () {
    const [trump, setTrump] = useState<Suit | null >(null);

    function onChange (event: React.MouseEvent<HTMLElement>, value: Suit) {
        event.preventDefault();
        setTrump(value);
    }

    return (
        <Stack>
            <ToggleButtonGroup exclusive value={trump} onChange={onChange} color='primary'>
                <ToggleButton value={'H'} ><Typography variant={'h2'} color={'red'} > ♥ </Typography></ToggleButton>
                <ToggleButton value={'S'} ><Typography variant={'h2'} color={'black'} > ♠ </Typography></ToggleButton>
                <ToggleButton value={'D'} ><Typography variant={'h2'} color={'red'} > ♦ </Typography></ToggleButton>
                <ToggleButton value={'C'} ><Typography variant={'h2'} color={'black'} > ♣ </Typography></ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    )    
}
