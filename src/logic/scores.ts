import { Suit } from "@/detection/cards";

const defaultBid = 81;
const beloteBid = 91;
//TODO manage the valat case
//const valatBid = 162;

export type Teams = 1 | 2;
export type DerChoice = Teams;
export type BeloteChoice = Teams | 0;
export type ContractChoice = Teams;

type DerScore = 0 | 10;
type BeloteScore = 0 | 20;

export type Score = {
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
    },
    checkDisability: () => boolean,
    updateTrump: (trump: Suit) => void,
    updateBelote: (team: BeloteChoice) => void,
    updateDer: (team: DerChoice) => void,
    updateContract: (team: ContractChoice) => void,
    updateTricks: (team: Teams, tricks: number) => void,
    updateScore: () => void,
}

export function initScore (source?:Score):Score {
    if (source) {
        return ({
            trump: source.trump,
            bid: source.bid,
            team1: {
                belote: source.team1.belote,
                der: source.team1.der,
                contracted: source.team1.contracted,
                tricks: source.team1.tricks,
                score: source.team1.score
            },
            team2: {
                belote: source.team2.belote,
                der: source.team2.der,
                contracted: source.team2.contracted,
                tricks: source.team2.tricks,
                score: source.team2.score
            },
            checkDisability: source.checkDisability,
            updateTrump: source.updateTrump,
            updateBelote: source.updateBelote,
            updateDer: source.updateDer,
            updateContract: source.updateContract,
            updateTricks: source.updateTricks,
            updateScore: source.updateScore,
        })
    } else return {
        trump: null as Suit | null,
        bid: defaultBid,
        team1: {
            belote: 0 as BeloteScore,
            der: 0 as DerScore,
            contracted: false,
            tricks: 0,
            score: 0
        },
        team2: {
            belote: 0 as BeloteScore,
            der: 0 as DerScore,
            contracted: false,
            tricks: 0,
            score: 0
        },
        checkDisability: function () {
            return (
                console.log("check disable", this.trump),
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
        updateScore: function () {
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
/*
export class Score implements IScore {
    trump = null as Suit|null;
    bid = defaultBid;
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
    //TODO fix the formula
    checkDisability = () => {
        return (
            (!this.team1.contracted && !this.team2.contracted) //no contractor selected
            || (this.team1.der === 0 && this.team2.der === 0) //no der selected
            //TODO understand why this.trump is not evaluated in checkDisability
            //|| (this.trump === null) //no trump selected
        );
    };

    constructor (init?: IScore) {
        Object.assign(this, init);
    };

    updateTrump (trump:Suit) {
        this.trump = trump;
    };

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
    };

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
    };

    updateContract (team: ContractChoice) {
        this.team1.contracted = (team === 1);
        this.team2.contracted = (team === 2);
    }; 

    updateTricks (team: number, tricks: number) {
        const bid = 162-10;
        if (team === 1) {
            this.team1.tricks = tricks;
            this.team2.tricks = bid - tricks;
        } else {
            this.team1.tricks = bid - tricks;
            this.team2.tricks = tricks;
        }
    };

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

}
*/