'use client';

import React, { useEffect, useState } from 'react';
import { Button, Stack } from "@mui/material";
import cardsExtraction from '@/detection/cards-extraction';
import VideoStreamCapture from '@/components/video-capture';
import { createModelConfig, Predictions } from '@/detection/roboflow';
import { Card, Cards } from '@/cards';

export default function Home(): React.ReactNode {
  const [openCapture, setOpenCapture] = useState(false);
  const [predictions, setPredictions] = useState<Predictions>([]);
  const [cards, setCards] = useState<Cards>([]);
  const model = createModelConfig();

  function openVideoCapture() {
    setOpenCapture(true);
  }

  function closeVideoCapture() {
    setOpenCapture(false);
  }

  useEffect(() => {
    if (predictions.length === 0) {
      return;
    }
    else {
      setCards(cardsExtraction(predictions));
    }
  }, [predictions]);

  useEffect(() => {
    cards?.forEach((card:Card) => {
      console.log(card.rank + " of " + card.suit);
    });
  }, [cards]);

  return (
    <Stack direction={'column'} spacing={2} >
      <Button onClick={openVideoCapture} variant="contained" color="primary">Capture Vidéo</Button>
      <VideoStreamCapture modelConfig={model} setPredictions={setPredictions} onClose={closeVideoCapture} open={openCapture} />
    </Stack>
  );
}
