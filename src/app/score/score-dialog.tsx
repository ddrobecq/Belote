'use client';

import React, { useContext, useMemo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";

import Der from "@/app/score/components/der";
import Trump from "@/app/score/components/trump";
import Belote from "@/app/score/components/belote";
import Contract from '@/app/score/components/contract';
import Tricks from '@/app/score/components/tricks';
import { createModelConfig } from '@/detection/roboflow';
import { IScore, Score } from '@/logic/scores';
import { ScoreContext, ScoreContextType } from './components/score-context';

type ScoreProps = {
    open: boolean,
    onClose: (score:IScore) => void
}

export default function ScoreDialog (props: ScoreProps) {
    const { score, setScore } = useContext(ScoreContext) as ScoreContextType;
    const model = useMemo(() => createModelConfig(), []);

    function onClose() {
        const temp = new Score(score);
        props.onClose(temp);
    }
    
    return (
        <Dialog open={props.open} onClose={onClose}>
            <DialogTitle>Nouveau score</DialogTitle>
            <DialogContent>
                <Stack direction={'column'} spacing={1} >
                    <Contract />
                    <Trump />
                    <Der />
                    <Belote />
                    <Tricks model={model} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fermer</Button>
            </DialogActions>
        </Dialog>
    )
}

