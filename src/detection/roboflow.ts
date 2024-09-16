//TODO use import roboflow-js instead of importing inferencejs in the head section of the html component in layout.jsx
//See https://github.com/roboflow/inferencejs-react-example/blob/main/src/App.js

import { useEffect, useState } from "react";

export type ModelConfig = {
  modelAPIKey: string;    //API key
  model: string;          //model name
  version: string;        //model version
  frequency: number;      //inferencing frequency in ms
  minConfidence : number; //minimum confidence for a detection to be considered
};

export type Prediction = {
  detection_id: string;
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
export type Predictions = Prediction[];
//window.roboflow = roboflow;

export function createModelConfig ():ModelConfig {
    return {
        modelAPIKey: "rf_MCMc7RN8h5hcIv9dNe90cKzG7aq1",
        model: "belote-cards-detection",
        version: "7",
        frequency: 1000,
        minConfidence: 0.8
    };
}

export default function useRoboflowModel (modelConfig:ModelConfig, inferRunning:boolean, video:any) {
    const [model, setModel] = useState(null);
    const [predictions, setPredictions] = useState<Predictions>([]);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const frequency = modelConfig.frequency

    useEffect (() => {
      window.roboflow.auth({ publishable_key: modelConfig.modelAPIKey }).load({ model: modelConfig.model, version: modelConfig.version })
      .then(function(model:any) {
        // model has loaded!
        setModel(model);
      })
      .catch(function(error:Error) {
        console.error(error);
        setModel(null);
      });
    }, []);

    useEffect (() => {
        if (inferRunning && model) {
          // Start inferencing loop evey {frequency} ms
          const t = setInterval(() => {
            detect(model);
          }, frequency);
          setTimer(t);
        } else {
          if (model) {
            clearInterval(timer as NodeJS.Timeout);
            setTimer(null);
          } 
        }
    }, [inferRunning]);

    async function detect(model:any) {
        // Check data is available
        if (typeof video !== "undefined" && video !== null) {
          //TODO : remove this if not needed
          /*        const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
    */
            const detections = await model.detect(video) as Predictions;
            setPredictions(predictions => appendPredictions(predictions, detections));
        }
    }

    function appendPredictions (predictions:Predictions, detections:Predictions):Predictions {
        let prevPredictions = predictions;
        if (detections.length > 0) {
            detections.forEach((detection:Prediction) => {
                //if the confidence of the detection is greater than the minConfidence, append it to the predictions array
                if (detection.confidence >= modelConfig.minConfidence) {
                  //if detections are not already in the predictions array, append them
                  let found = false;
                  prevPredictions.forEach(prediction => {
                    if (prediction.class === detection.class) {
                      found = true;
                    }
                    if (found) return;
                  });
                  if (!found) {
                    prevPredictions = [...prevPredictions, detection];
                  }
                }
            });
        }
        return prevPredictions;
    }
    
    return [model, predictions];
}
