import { Button, Stack, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import GamesCard from "./games-card";
import VideoStreamCapture from "./video-capture";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { GamesContext, GamesContextType } from "@/context/games-context";

type TricksProps = {
    setPredictions: (predictions: any) => void,
    model: any
}

export default function Tricks (props: TricksProps) {
    const [openCapture, setOpenCapture] = useState(false);
    const [tricks1, setTricks1] = useState<number>(0);
    const [tricks2, setTricks2] = useState<number>(0);
    const { game, setGame } = useContext(GamesContext) as GamesContextType;

    function openVideoCapture() {
        setOpenCapture(true);
    }
    
    function closeVideoCapture() {
        setOpenCapture(false);
    }

    //TODO remove tne up and down spinner 
    function onChange (event: React.ChangeEvent<HTMLInputElement>) {
        const value = Number (event.target.value);
        const id = Number (event.target.id);
        let localGame = game;
        localGame.updateTricks(id, value);
        localGame.updateScore();
        setGame({...localGame});
    }

    useEffect(() => {
        setTricks1 (game.team1.tricks);
        setTricks2 (game.team2.tricks);
    }, [game]);

    return (
        <GamesCard title={"Quelle est la valeur des plis réalisés ?"} >
            <Stack sx={{ width:"100%" }} direction={'row'} justifyContent={'space-evenly'}  >
                <TextField value={tricks1} id="1" label="Equipe 1" variant="filled" type="number" onChange={onChange} />
                <Button onClick={openVideoCapture} variant="contained" color="primary">
                    <CameraAltIcon />
                </Button>
                <TextField value={tricks2} id="2" label="Equipe 2" variant="filled" type="number" onChange={onChange} />
            </Stack>
            <VideoStreamCapture modelConfig={props.model} setPredictions={props.setPredictions} onClose={closeVideoCapture} open={openCapture} />
        </GamesCard>
    );
}