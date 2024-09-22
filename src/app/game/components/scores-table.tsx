import { Game } from "@/logic/game"
import { IScore } from "@/logic/scores"
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material"

type ScoreProps = {
    game: Game
}

export default function ScoresTable(props:ScoreProps) {
    const scores = props.game.scores;
    const team1 = props.game.team1.name;
    const team2 = props.game.team2.name;
    return (
        <Stack direction={'column'} spacing={2} >
            <Stack direction={'row'} justifyContent={'space-evenly'}>
                <Typography variant="h2">{team1}</Typography>
                <Typography variant="h2">{team2}</Typography>
            </Stack>
            <Stack >
                {scores.map ((score:IScore, index:number) => {
                    return (
                        <Stack key={index} direction={'row'} justifyContent={'space-evenly'}>
                            <ScoreBox score={score.team1.score} />
                            <ScoreBox score={score.team2.score} />
                        </Stack>
                    );
                })
                }
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-evenly'}>
                <ScoreBox score={props.game.team1.total} total best={(props.game.team1.total > props.game.team2.total)} />
                <ScoreBox score={props.game.team2.total} total best={(props.game.team1.total < props.game.team2.total)} />
            </Stack>
        </Stack>
    )
}

type ScoreBoxProps = {
    score: number
    total?: boolean
    best?: boolean
}
function ScoreBox (props:ScoreBoxProps) {
    const theme = useTheme();
    const color = props.total ? (props.best ? theme.palette.success.main : theme.palette.error.main) : theme.palette.primary.main;
    return (
        <Box sx={{ width: '100px', border: '1px solid white', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h1" color={color} >{props.score}</Typography>
        </Box>
    )
}