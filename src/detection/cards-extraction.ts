import { Cards, Card, Rank, Suit } from '@/detection/cards';
import { Predictions } from 'inferencejs';

export default function cardsExtraction (predictions:Predictions, trump:Suit):Cards {
	const cards:Cards = [];
	predictions.forEach(prediction => {
		let card:Card;
		switch (prediction.class.length) {
		case 2:
			card = {
				rank: prediction.class[0] as Rank,
				suit: prediction.class[1] as Suit,
				value: 0
			};
			break;
		case 3:
			card = {
				rank: (prediction.class[0]+prediction.class[1]) as Rank,
				suit: prediction.class[2] as Suit,
				value: 0
			};
			break;
		default:
			throw new Error("Invalid card prediction");
		}
		card.value = getCardValue(card, trump);
		cards.push(card);
	});
	return cards;
}

// Function to get the value of a card
/**
 * 
 * @param card : Card to get the value from
 * @param trump : Trump suit
 * @returns the value of the card according to the trump suit
 */
function getCardValue(card:Card, trump:Suit):number {
	switch (card.rank) {
	case "7":
		return 0;
	case "8":
		return 0;
	case "9":
		if (card.suit === trump) {
			return 14;
		} else {
			return 0;
		}
	case "10":
		return 10;
	case "J":
		if (card.suit === trump) {
			return 20;
		} else {
			return 2;
		}
	case "Q":
		return 3;
	case "K":
		return 4;
	case "A":
		return 11;
	default:
		return 0;
	}
}