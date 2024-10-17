import { InferenceEngine, CVImage, Prediction, Predictions } from "inferencejs";
import { RefObject, useEffect, useMemo, useState } from "react";
import Webcam from "react-webcam";

export type ModelConfig = {
  modelAPIKey: string;    //API key
  model: string;          //model name
  version: string;        //model version
  frequency: number;      //inferencing frequency in ms
  minConfidence : number; //minimum confidence for a detection to be considered
};

export function createModelConfig ():ModelConfig {
	return {
		modelAPIKey: process.env.NEXT_PUBLIC_ROBOFLOW_API_KEY as string,
		model: "belote-cards-detection",
		version: "7",
		frequency: 1000,
		minConfidence: 0.8
	};
}

export default function useRoboflowModel (modelConfig:ModelConfig, inferRunning:boolean, videoRef:RefObject<Webcam>) {
	const [model, setModel] = useState<string | null>(null);
	const [predictions, setPredictions] = useState<Predictions>([]);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const frequency = modelConfig.frequency
	const [modelLaoding, setModelLoading] = useState<boolean>(false);

	const inferEngine = useMemo(() => { 
		return new InferenceEngine();
	}, []);

	useEffect(() => {
		if (!modelLaoding) {
			setModelLoading(true);
			inferEngine.startWorker(modelConfig.model, modelConfig.version, modelConfig.modelAPIKey)
				.then ((model) => setModel(model as unknown as string))
				.catch((error:Error) => console.error(error));
		}
	}, [modelConfig, modelLaoding, inferEngine]);

	useEffect(() => {
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
	}, [model, inferRunning]);

	async function detect(model:string) {
		// Check data is available
		if (typeof videoRef !== "undefined" && videoRef !== null && videoRef.current?.video?.readyState === 4) {
			const img = new CVImage(videoRef.current?.video);
			console.debug("model", model, 'is detecting...');
			inferEngine.infer (model, img)
				.then((detections:Predictions) => {
					setPredictions(predictions => appendPredictions(predictions, detections));
				})
				.catch((error:Error) => console.error(error));
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
