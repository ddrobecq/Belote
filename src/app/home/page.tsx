'use client';

import React from 'react';
import Score from '@/components/scores';
import ScoreContextProvider from '@/context/score-context';

export default function Home(): React.ReactNode {
  return (
    <ScoreContextProvider >
      <Score />
    </ScoreContextProvider>
  )
}
