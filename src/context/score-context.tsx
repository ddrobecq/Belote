import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { Scores } from "@/types/scores";
import { initScore } from "@/logic/score-logic";

export type ScoreContextType = {
    score: Scores,
    setScore: (tricks: Scores) => void
}

export const ScoreContext = createContext<ScoreContextType | null >(null);

type ScoreContextProviderProps = {
    children: React.ReactNode
}

export default function ScoreContextProvider (props:ScoreContextProviderProps) {
    const [score, setScore] = useState<Scores>(initScore());

    useEffect(() => {
        console.debug(score, score.team1.score, score.team2.score);
    }, [score]);

    return (
        <ScoreContext.Provider value={{ score, setScore }} >
            { props.children }
        </ScoreContext.Provider>
    );
}