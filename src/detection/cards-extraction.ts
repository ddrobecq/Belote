import { Cards, Card, Rank, Suit } from '@/cards';
import { Predictions } from '@/detection/roboflow';

export default function cardsExtraction (predictions:Predictions):Cards {
    //todo : get trump from the user
    const trump:Suit = "H";
    let cards:Cards = [];
    predictions.forEach(prediction => {
        let card:Card = {
            rank: prediction.class[0] as Rank,
            suit: prediction.class[1] as Suit,
            value: 0
        };   
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