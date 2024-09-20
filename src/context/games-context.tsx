import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { Games } from "@/types/games";
import { initGame } from "@/logic/games-logic";
//import { GamesClass } from '@/types/games-class';

export type GamesContextType = {
    game: Games,
    setGame: (tricks: Games) => void
}

export const GamesContext = createContext<GamesContextType | null >(null);

type GamesContextProviderProps = {
    children: React.ReactNode
}

export default function GamesContextProvider (props:GamesContextProviderProps) {
    const [game, setGame] = useState<Games>(initGame());

    useEffect(() => {
        console.debug(game, game.team1.score, game.team2.score);
    }, [game]);

    return (
        <GamesContext.Provider value={{ game, setGame }} >
            { props.children }
        </GamesContext.Provider>
    );
}