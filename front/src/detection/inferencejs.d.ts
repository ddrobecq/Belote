declare module 'inferencejs' {
    export class InferenceEngine {
      constructor();
      infer(_model:string, _image: CVImage): Promise<Predictions>;
      startWorker(_model: string, _version: string, _apiKey: string): Promise<void>;
    }
  
    export class CVImage {
      constructor(_imageData: HTMLImageElement | HTMLCanvasElement | ImageBitmap | HTMLVideoElement);
    }
  
    export type Prediction = {
      detection_id: string;
      class: string;
      confidence: number;
      x: number;
      y: number;
      width: number;
      height: number;
    };
  
    export type Predictions = Prediction[];
}