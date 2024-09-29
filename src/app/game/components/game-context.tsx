"use client";

import React, { useEffect, createContext, useState } from "react";
import { initGame, Game } from "@/logic/game";

export type GameContextType = {
	game: Game,
	setGame: (_game: Game) => void
}

export const GameContext = createContext<GameContextType | null >(null);

type GameContextProviderProps = {
	children: React.ReactNode
	team1: string,
	team2: string
}

export default function GameContextProvider (props:GameContextProviderProps) {
	const [game, setGame] = useState<Game>(initGame(props.team1, props.team2)); 

	useEffect(() => {
		console.debug(game);
	}, [game]);

	return (
		<GameContext.Provider value={{ game, setGame }} >
			{ props.children }
		</GameContext.Provider>
	);
}