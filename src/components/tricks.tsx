import { IconButton, InputAdornment, OutlinedInput, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ScoreCard from "./score-card";
import VideoStreamCapture from "./video-capture";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ScoreContext, ScoreContextType } from "@/context/score-context";
import { Predictions } from "inferencejs";
import { Card, Suit } from "@/types/cards";
import cardsExtraction from "@/detection/cards-extraction";
import { Teams } from "@/types/scores";

type TricksProps = {
    model: any
}

export default function Tricks (props: TricksProps) {
    const [tricks1, setTricks1] = useState<number>(0);
    const [tricks2, setTricks2] = useState<number>(0);
    const [predictions1, setPredictions1] = useState<Predictions>([]);
    const [predictions2, setPredictions2] = useState<Predictions>([]);
    const { score, setScore } = useContext(ScoreContext) as ScoreContextType;

    function extractPredictions (predictions: Predictions) {
        let total = 0;
        if (predictions1.length > 0) {
            const trump = score.trump as Suit;
            const cards = cardsExtraction(predictions, trump);
            cards?.forEach((card:Card) => {
                total += card.value;
                console.debug(card.rank + " of " + card.suit + " pour " + card.value + " points");
            });
        }
        return total;
    }

    useEffect(() => {
        const total = extractPredictions(predictions1);
        updateTricks(1, total);
    }, [predictions1]);
    
    useEffect(() => {
        const total = extractPredictions(predictions2);
        updateTricks(2, total);
    }, [predictions2]);

    
    //TODO remove tne up and down spinner 
    function onChange (event: React.ChangeEvent<HTMLInputElement>) {
        const value = Number (event.target.value);
        const id = Number (event.target.id) as Teams;
        updateTricks(id, value);
    }

    function updateTricks (team: Teams, value: number) {
        let localScore = score;
        localScore.updateTricks(team, value);
        localScore.updateScore();
        setScore({...localScore});
    }

    useEffect(() => {
        setTricks1 (score.team1.tricks);
        setTricks2 (score.team2.tricks);
    }, [score]);

    return (
        <ScoreCard title={"Quelle est la valeur des plis réalisés ?"} >
            <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'}  >
                <OutlinedInput id={'1'} value={tricks1} type="number" onChange={onChange} endAdornment={<VideoCaptureAdorment id={1} setPredictions={setPredictions1} model={props.model} />} label={"Equipe 1"} />
                <OutlinedInput id={'2'} value={tricks2} type="number" onChange={onChange} endAdornment={<VideoCaptureAdorment id={2} setPredictions={setPredictions2} model={props.model} />} label={"Equipe 2"} />
            </Stack>
        </ScoreCard>
    );
}

type VideoCaptureAdormentProps = {
    id: number,
    model: any,
    setPredictions: (predictions: Predictions) => void
}

function VideoCaptureAdorment (props:VideoCaptureAdormentProps) {
    const [openCapture, setOpenCapture] = useState(false);

    function openVideoCapture() {
        setOpenCapture(true);
    }
    
    function closeVideoCapture() {
        setOpenCapture(false);
    }

    return (
        <Stack >
            <InputAdornment position="end">
                <IconButton onClick={openVideoCapture}>
                    <CameraAltIcon />
                </IconButton>
            </InputAdornment>
            <VideoStreamCapture modelConfig={props.model} setPredictions={props.setPredictions} onClose={closeVideoCapture} open={openCapture} />
        </Stack>
    );
}