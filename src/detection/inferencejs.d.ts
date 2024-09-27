declare module 'inferencejs' {
    export class InferenceEngine {
      constructor();
      infer(model:any, image: CVImage): Promise<Predictions>;
      startWorker(model: string, version: string, apiKey: string): Promise<void>;
    }
  
    export class CVImage {
      constructor(imageData: HTMLImageElement | HTMLCanvasElement | ImageBitmap | HTMLVideoElement);
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