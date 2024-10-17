import { Suit } from "@/detection/cards";

const defaultBid = 81;
const beloteBid = 91;
const capotScore = 252; 
export const maxTricks = 152;

export type Teams = 1 | 2;
export type DerChoice = Teams;
export type BeloteChoice = Teams | 0;
export type CapotChoice = Teams | 0;
export type ContractChoice = Teams;

type DerScore = 0 | 10;
type BeloteScore = 0 | 20;

export type Score = {
    trump: Suit | null,
    bid: number,
    team1: {
        name: string,
        belote: BeloteScore,
        der: DerScore,
        contracted: boolean,
        tricks: number,
        capot: boolean,
        score: number
    },
    team2: {
        name: string,
        belote: BeloteScore,
        der: DerScore,
        contracted: boolean,
        tricks: number,
        capot: boolean,
        score: number
    },
    checkDisability: () => boolean,
    updateTrump: (_trump: Suit) => void,
    updateBelote: (_team: BeloteChoice) => void,
    updateDer: (_team: DerChoice) => void,
    updateContract: (_team: ContractChoice) => void,
    updateTricks: (_team: Teams, _tricks: number) => void,
    updateCapot: (_team: CapotChoice) => void,
    updateScore: () => void,
}

export function initScore (team1?:string, team2?:string):Score {
	return {
		trump: null as Suit | null,
		bid: defaultBid,
		team1: {
			name: team1 || "Eux",
			belote: 0 as BeloteScore,
			der: 0 as DerScore,
			contracted: false,
			tricks: 0,
			capot: false,
			score: 0
		},
		team2: {
			name: team2 || "Nous",
			belote: 0 as BeloteScore,
			der: 0 as DerScore,
			contracted: false,
			tricks: 0,
			capot: false,
			score: 0
		},
		checkDisability: function () {
			return (
				(!this.team1.contracted && !this.team2.contracted) //no contractor selected
                || (this.team1.der === 0 && this.team2.der === 0) //no der selected
                || (this.trump === null) //no trump selected
			);
		},

		updateTrump: function (trump:Suit) {
			this.trump = trump;
		},

		updateBelote: function (team: BeloteChoice) {
			switch (team) {
			case 0:
				this.team1.belote = 0;
				this.team2.belote = 0;
				this.bid = defaultBid;
				break;
			case 1:
				this.team1.belote = 20;
				this.team2.belote = 0;
				this.bid = beloteBid;
				break;
			case 2:
				this.team1.belote = 0;
				this.team2.belote = 20;
				this.bid = beloteBid;
				break;  
			default:
				this.team1.belote = 0;
				this.team2.belote = 0;
				this.bid = defaultBid;
				break;
			}
		},
		updateDer: function (team: DerChoice) {
			switch (team) {
			case 1:
				this.team1.der = 10;
				this.team2.der = 0;
				break;
			case 2:
				this.team1.der = 0;
				this.team2.der = 10;
				break;
			default:
				this.team1.der = 0;
				this.team2.der = 0;
				break;
			}
		},
		updateContract: function (team: ContractChoice) {
			this.team1.contracted = (team === 1);
			this.team2.contracted = (team === 2);
		},
		updateTricks: function (team: Teams, tricks: number) {
			const bid = 162-10;
			if (team === 1) {
				this.team1.tricks = tricks;
				this.team2.tricks = bid - tricks;
			} else {
				this.team1.tricks = bid - tricks;
				this.team2.tricks = tricks;
			}
		},
		updateCapot: function (team: CapotChoice) {
			this.team1.capot = (team === 1);
			this.team2.capot = (team === 2);
		},
		updateScore: function () {
			let score1 = 0;
			let score2 = 0;
			if (this.team1.capot) {
				score1 = capotScore;
				score2 = this.team2.belote;
			} else if (this.team2.capot) {
				score1 = this.team1.belote;
				score2 = capotScore;
			} else {
				score1 = this.team1.der + this.team1.tricks + this.team1.belote;
				score2 = this.team2.der + this.team2.tricks + this.team2.belote;

				if (this.team1.contracted) {
					if (score1 < this.bid) {
						score1 = this.team1.belote;
						score2 = 162 + this.team2.belote;
					}
				} else {
					if (score2 < this.bid) {
						score1 = 162 + this.team1.belote;
						score2 = this.team2.belote;
					}
				}
			}
			this.team1.score = score1;
			this.team2.score = score2;
		}
	};
}
