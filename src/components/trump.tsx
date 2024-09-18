import { Suit } from '@/types/cards';
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import GamesCard from './games-card';
import { GamesContext, GamesContextType } from '@/context/games-context';

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
    const { game, setGame } = useContext(GamesContext) as GamesContextType;

    function onChange (event: React.MouseEvent<HTMLElement>, value: Suit) {
        if (value !== null) {
            event.preventDefault();
            setTrump(value);
        }
    }

    useEffect(() => {
        if (trump !== null) {
            let localGame = game;
            localGame.updateTrump(trump);
            localGame.updateScore();
            setGame({...localGame});
        }
    }, [trump]);

    return (
        <GamesCard title={"Quel était l'Atout ?"}>
        <ToggleButtonGroup exclusive value={trump} onChange={onChange} >
            <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                {trumps.map((element) => (
                    <ToggleButton key={element.suit} sx={{ backgroundColor:'white' }} value={element.suit} >
                        <Typography variant={'h1'} color={element.color} > {element.symbol} </Typography>
                    </ToggleButton>
                ))}
            </Stack>
        </ToggleButtonGroup>
        </GamesCard>
    )    
}
