import { GamesClass } from "../logic/games-logic";

export type Teams = 1 | 2;
export type DerChoice = Teams;
export type BeloteChoice = Teams | 0;
export type ContractChoice = Teams;

type DerScore = 0 | 10;
type BeloteScore = 0 | 20;

export type Games = {
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

