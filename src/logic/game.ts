import { Score } from "@/logic/scores";

const defaultTarget = 1000;

export default class Game {
	target: number;
	team1: {
        name: string,
        total: number,
    };
	team2: {
        name: string,
        total: number,
    };
	scores: Score[];

	constructor(name1?:string, name2?:string) {
		this.target = defaultTarget;
		this.team1 = {
			name: name1 || "Eux",
			total: 0
		};
		this.team2 = {
			name: name2 || "Nous",
			total: 0
		};
		this.scores = [];
	}

	calculateTotalScores() {
		this.team1.total = 0;
		this.team2.total = 0;
		const max = this.scores.length;
		let litige: Score | boolean = false;
		for (let i = 0 ; i < max; i++) {
			const element = this.scores[i];
			const score1 = element.team1.score;
			const score2 = element.team2.score;
			if (litige) {
				//if the was a litige on last round
				if (litige.team1.contracted) {
					//if team1 has contracted
					if (score1 > score2) {
						//team1 have to win to get the score
						this.team1.total += score1;
						this.team2.total += score2;
					} else {
						//otherwise team2 get its score + last round team1's score
						this.team1.total += (element.team1.score - litige.team1.score);
						this.team2.total += element.team2.score + litige.team1.score;
						this.scores[i-1].team1.score = 0;
						this.scores[i-1].team2.score = this.scores[i-1].team2.score * 2;
					}
				} else if (litige.team2.contracted) {
					if (score2 > score1) {
						this.team1.total += score1;
						this.team2.total += score2;
					} else {
						this.team1.total += element.team1.score + litige.team2.score;
						this.team2.total += (element.team2.score - litige.team2.score);
						this.scores[i-1].team1.score = this.scores[i-1].team1.score * 2;
						this.scores[i-1].team2.score = 0;
					}
				}
			} else {
				this.team1.total += score1;
				this.team2.total += score2;
			}
			if (score1 === score2) {
				//equality means litige
				litige = element;
			} else {
				litige = false;
			}
		}
	}
}
