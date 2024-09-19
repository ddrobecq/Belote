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
        updateTricks (team: number, tricks: number) {
            const bid = 162-10;
            //bid = (this.bid*2) - 10;
            if (team === 1) {
                this.team1.tricks = tricks;
                this.team2.tricks = bid - tricks;
            } else {
                this.team1.tricks = bid - tricks;
                this.team2.tricks = tricks;
            }
        },
        updateScore () {
            //TODO case of "capot" (162)
            //TODO case of equal tricks
            let score1 = this.team1.der + this.team1.tricks + this.team1.belote;
            let score2 = this.team2.der + this.team2.tricks + this.team2.belote;
    
            if (this.team1.contracted) {
                if (score1 < this.bid) {
                    score1 = this.team1.belote;
                }
            } else {
                if (score2 < this.bid) {
                    score2 = this.team2.belote;
                }
            }
            this.team1.score = score1;
            this.team2.score = score2;
        }
    };
}
