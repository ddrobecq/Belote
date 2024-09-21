'use client';

import React, { useMemo } from 'react';
import { Stack } from "@mui/material";

import Der from "./der";
import Trump from "./trump";
import Belote from "./belote";
import Contract from './contract';
import Tricks from './tricks';
import { createModelConfig } from '@/detection/roboflow';

export default function Score () {
    const model = useMemo(() => createModelConfig(), []);
  
    return (
        <Stack direction={'column'} spacing={1} >
            <Contract />
            <Trump />
            <Der />
            <Belote />
            <Tricks model={model} />
        </Stack>
    )
}

