'use client';

import React, { useContext, useMemo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";

import Der from "@/app/score/components/der";
import Trump from "@/app/score/components/trump";
import Belote from "@/app/score/components/belote";
import Contract from '@/app/score/components/contract';
import Tricks from '@/app/score/components/tricks';
import { createModelConfig } from '@/detection/roboflow';
import { Score } from '@/logic/scores';
import { ScoreContext, ScoreContextType } from './components/score-context';
import Capot from './components/capot';

type ScoreProps = {
    open: boolean,
    onClose: (score:Score | null) => void
}

export default function ScoreDialog (props: ScoreProps) {
    const { score,  } = useContext(ScoreContext) as ScoreContextType;
    const model = useMemo(() => createModelConfig(), []);

    function onClose() {
        const temp = score;
        props.onClose(temp);
    }

    function onCancel() {
        props.onClose(null);
    }
    
    return (
        <Dialog open={props.open} onClose={onClose}>
            <DialogTitle>Nouveau score</DialogTitle>
            <DialogContent>
                <Stack direction={'column'} spacing={0} >
                    <Contract />
                    <Trump />
                    <Der />
                    <Belote />
                    <Capot />
                    <Tricks model={model} />
                </Stack>
            </DialogContent>
            <DialogActions>
            <Button onClick={onCancel} color={'error'} >Annuler</Button>
            <Button onClick={onClose} disabled={score.checkDisability()} color={'success'} >Valider</Button>
            </DialogActions>
        </Dialog>
    )
}

