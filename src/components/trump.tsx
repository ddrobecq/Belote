import { Suit } from '@/cards';
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import TricksCard from './tricks-card';

const trumps = [
    {
        suit: 'H',
        color: 'red',
        symbol: '♥'
    },
    {
        suit: 'S',
        color: 'black',
        symbol: '♠'
    },
    {
        suit: 'D',
        color: 'red',
        symbol: '♦'
    },
    {
        suit: 'C',
        color: 'black',
        symbol: '♣'
    }
]

export default function TrumpToggle () {
    const [trump, setTrump] = useState<Suit | null >(null);

    function onChange (event: React.MouseEvent<HTMLElement>, value: Suit) {
        event.preventDefault();
        setTrump(value);
    }

    return (
        <TricksCard title={"Quel était l'Atout ?"}>
        <ToggleButtonGroup exclusive value={trump} onChange={onChange} >
            <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                {trumps.map((element) => (
                    <ToggleButton sx={{ backgroundColor:'white' }} value={element.suit} >
                        <Typography variant={'h1'} color={element.color} > {element.symbol} </Typography>
                    </ToggleButton>
                ))}
            </Stack>
        </ToggleButtonGroup>
        </TricksCard>
    )    
}
