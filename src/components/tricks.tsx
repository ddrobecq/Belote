'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Stack } from "@mui/material";

import Der from "./der";
import Trump from "./trump";
import Belote from "./belote";
import VideoStreamCapture from '@/components/video-capture';
import { createModelConfig } from '@/detection/roboflow';
import cardsExtraction from '@/detection/cards-extraction';
import { Predictions } from 'inferencejs';
import { Card, Cards } from '@/cards';
import Bid from './bid';

export default function Tricks () {
    const [openCapture, setOpenCapture] = useState(false);
    const [predictions, setPredictions] = useState<Predictions>([]);
    const [cards, setCards] = useState<Cards>([]);
    const model = useMemo(() => createModelConfig(), []);
  
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
        const trump = "H";
        setCards(cardsExtraction(predictions, trump));
      }
    }, [predictions]);
  
    useEffect(() => {
      cards?.forEach((card:Card) => {
        console.log(card.rank + " of " + card.suit + " pour " + card.value + " points");
      });
    }, [cards]);
  
    return (
        <Stack direction={'column'} spacing={2} >
            <Bid />
            <Trump />
            <Der />
            <Belote />
            <Button onClick={openVideoCapture} variant="contained" color="primary">Capture Vidéo</Button>
            <VideoStreamCapture modelConfig={model} setPredictions={setPredictions} onClose={closeVideoCapture} open={openCapture} />
        </Stack>
    )
}