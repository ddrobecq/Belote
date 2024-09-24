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

export type IScore = {
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
    checkDisability: () => boolean,
}

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
