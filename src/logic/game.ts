import { Score } from "@/logic/scores";

const defaultTarget = 1000;

export type IGame = {
    target: number,
    team1: {
        name: string,
        total: number,
    },
    team2: {
        name: string,
        total: number,
    }
    scores: Score[],
}

export class Game implements IGame {
    target = defaultTarget;
    team1 = {
        name: "Elles",
        total: 0
    };
    team2 = {
        name: "Ils",
        total: 0
    };
    scores = [] as Score[];

    constructor (init?: IGame) {
        Object.assign(this, init);
    };
}
