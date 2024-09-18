'use client';

import React from 'react';
import GameResult from '@/components/game-result';
import GamesContextProvider from '@/context/games-context';

export default function Home(): React.ReactNode {
  return (
    <GamesContextProvider >
      <GameResult />
    </GamesContextProvider>
  )
}
