'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Stack } from "@mui/material";

import Der from "./der";
import Trump from "./trump";
import Belote from "./belote";
import Contract from './contract';
import Tricks from './tricks';
import { createModelConfig } from '@/detection/roboflow';
import cardsExtraction from '@/detection/cards-extraction';
import { Predictions } from 'inferencejs';
import { Card, Cards } from '@/types/cards';

export default function GameResult () {
    const [predictions, setPredictions] = useState<Predictions>([]);
    const [cards, setCards] = useState<Cards>([]);
    const model = useMemo(() => createModelConfig(), []);
  
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
        <Stack direction={'column'} spacing={1} >
            <Contract />
            <Trump />
            <Der />
            <Belote />
            <Tricks model={model} setPredictions={setPredictions} />
        </Stack>
    )
}

