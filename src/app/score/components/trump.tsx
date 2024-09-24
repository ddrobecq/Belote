import { useContext, useEffect, useState } from 'react';
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Suit } from '@/detection/cards';
import ScoreCard from '@/app/score/components/score-card';
import { ScoreContext, ScoreContextType } from '@/app/score/components/score-context';
import { initScore } from '@/logic/scores';

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
    const { score, setScore } = useContext(ScoreContext) as ScoreContextType;

    function onChange (event: React.MouseEvent<HTMLElement>, value: Suit) {
        if (value !== null) {
            event.preventDefault();
            setTrump(value);
        }
    }

    useEffect(() => {
        if (trump !== null) {
            let localScore = initScore(score);
            localScore.updateTrump(trump);
            localScore.updateScore();
            setScore({...localScore});
        }
    }, [trump]);

    return (
        <ScoreCard title={"Quel était l'Atout ?"}>
        <ToggleButtonGroup exclusive value={trump} onChange={onChange} >
            <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'} >
                {trumps.map((element) => (
                    <ToggleButton key={element.suit} sx={{ backgroundColor:'white' }} value={element.suit} >
                        <Typography variant={'h1'} color={element.color} > {element.symbol} </Typography>
                    </ToggleButton>
                ))}
            </Stack>
        </ToggleButtonGroup>
        </ScoreCard>
    )    
}
