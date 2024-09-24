import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { initScore, Score } from "@/logic/scores";

export type ScoreContextType = {
    score: Score,
    setScore: (score: Score) => void
}

export const ScoreContext = createContext<ScoreContextType | null >(null);

type ScoreContextProviderProps = {
    children: React.ReactNode
}

export default function ScoreContextProvider (props:ScoreContextProviderProps) {
    const [score, setScore] = useState<Score>(initScore()); 

    useEffect(() => {
        console.debug(score, score.team1.score, score.team2.score);
    }, [score]);

    return (
        <ScoreContext.Provider value={{ score, setScore }} >
            { props.children }
        </ScoreContext.Provider>
    );
}