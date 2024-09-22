import { IScore } from "@/logic/scores";

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
    scores: IScore[],
}

export class Game implements IGame {
    target = defaultTarget;
    team1 = {
        name: "Eux",
        total: 0
    };
    team2 = {
        name: "Nous",
        total: 0
    };
    scores = [] as IScore[];

    constructor (init?: IGame) {
        Object.assign(this, init);
    };
}
