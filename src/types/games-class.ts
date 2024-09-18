import { Suit } from '@/types/cards';
import { Games, BeloteChoice, DerChoice, ContractChoice } from '@/types/games';

const defaultBid = 81;
const beloteBid = 91;
const valatBid = 162;

export function initGame(): Games {
    return {
        trump: null,
        bid: defaultBid,
        team1: {
            belote: 0,
            der: 0,
            contracted: false,
            tricks: 0,
            score: 0
        },
        team2: {
            belote: 0,
            der: 0,
            contracted: false,
            tricks: 0,
            score: 0
        },
        updateTrump (trump:Suit) {
            this.trump = trump;
        },
        updateBelote(team: BeloteChoice) {
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
        updateDer(team: DerChoice) {
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
        updateContract (team: ContractChoice) {
            this.team1.contracted = (team === 1);
            this.team2.contracted = (team === 2);
        },
        updateTricks (tricks1: number, tricks2: number) {
            this.team1.tricks = tricks1;
            this.team2.tricks = tricks2;
        },
        updateScore () {
            //TODO case of "capot" (162)
            //TODO case of equal tricks
            let score1 = this.team1.belote;
            let score2 = this.team2.belote;
    
            if (this.team1.contracted) {
                const score = this.team1.der + this.team1.tricks;
                if (score > this.bid) {
                    score1 += score;
                    score2 += this.team2.tricks + this.team2.der;
                } else {
                    score2 += this.team2.tricks + this.team2.der;
                }
            } else {
                const score = this.team2.der + this.team2.tricks;
                if (this.team2.tricks > this.bid) {
                    score1 += this.team1.tricks + this.team1.der;
                    score2 += score;
                } else {
                    score1 += this.team1.tricks + this.team1.der;
                }
            }
            this.team1.score = score1;
            this.team2.score = score2;
        }
    };
}
