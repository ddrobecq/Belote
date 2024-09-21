import { Suit } from "./cards";

export type Teams = 1 | 2;
export type DerChoice = Teams;
export type BeloteChoice = Teams | 0;
export type ContractChoice = Teams;

type DerScore = 0 | 10;
type BeloteScore = 0 | 20;

export type Scores = {
    trump: Suit | null,
    bid: number,
    team1: {
        belote: BeloteScore,
        der: DerScore,
        contracted: boolean,
        tricks: number,
        score: number
    },
    team2: {
        belote: BeloteScore,
        der: DerScore,
        contracted: boolean,
        tricks: number,
        score: number
    }
    updateTrump(trump: Suit): void;
    updateBelote(team: BeloteChoice): void;
    updateDer(team: DerChoice): void;
    updateContract(team: ContractChoice): void;
    updateTricks(tricks1: number, tricks2: number): void;
    updateScore(): void;
}

type Partie = {
    trump: Suit | null,
    bid: number,
    team1: {
        belote: BeloteScore,
        der: DerScore,
        contracted: boolean,
        tricks: number,
        score: number
    },
    team2: {
        belote: BeloteScore,
        der: DerScore,
        contracted: boolean,
        tricks: number,
        score: number
    }
}

export class ScoresClass implements Partie {
    trump = null as Suit | null;
    bid = 0;
    team1 = {
        belote: 0 as BeloteScore,
        der: 0 as DerScore,
        contracted: false,
        tricks: 0,
        score: 0
    };
    team2 = {
        belote: 0 as BeloteScore,
        der: 0 as DerScore,
        contracted: false,
        tricks: 0,
        score: 0
    };

    updateTrump(trump: Suit): void {
        this.trump = trump;
    }
}

//TODO to remove 
const MyScore = new ScoresClass();
console.log(MyScore);
MyScore.updateTrump('H');
console.log(MyScore);
