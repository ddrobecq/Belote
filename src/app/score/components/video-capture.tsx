import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import useRoboflowModel, { ModelConfig } from "@/detection/roboflow";

type VideoCaptureMode = "user" | "environment";
type VideoStreamCaptureProps = {
  open: boolean;
  modelConfig: ModelConfig;
  setPredictions: Function;
  onClose: () => void;
};

export default function VideoStreamCapture (props: VideoStreamCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [inferRunning, setInferRunning] = useState(false);
  const [model, predictions] = useRoboflowModel(props.modelConfig, inferRunning, webcamRef);
  const [facingMode, setFacingMode] = useState<VideoCaptureMode>("environment");
  
  function onClose() {
    setInferRunning(false);
    props.onClose();
  }

  function reverse() {
    if (facingMode === "user") {
      setFacingMode("environment");
    } else {
      setFacingMode("user");
    }
  }

  function startInfer () {
    if (model) setInferRunning(true);
  };

  function stopInfer () {
    setInferRunning(false);
  };

  useEffect (() => {
    props.setPredictions(predictions);
  }, [predictions]);


  return (
    <Dialog open={props.open} onClose={onClose}>
      <DialogTitle>Capture</DialogTitle>
      <DialogContent>
        <Box sx={{ borderRadius: 40, display: "flex", justifyContent: "center" }}>
          < Webcam ref={webcamRef} audio={false} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} alignSelf={'center'}  >
          <Button onClick={onClose}>Fermer</Button>
          <Button onClick={reverse} startIcon={<CameraswitchIcon />}>Reverse</Button>
          <Button
            onClick={(!inferRunning) ? startInfer : stopInfer}
            startIcon={<CameraAltIcon />}
            color={(!inferRunning) ? "success" : "error"}
            disabled={(!model) ? true : false}
          >
            {(!inferRunning) ? "Démarrer" : "Arrêter"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
