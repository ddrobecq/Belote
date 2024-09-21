// Definition of the interface used in the project

// Define the type of the card
// The card is represented by a string of two characters
// The first character is the rank of the card
export type Rank = "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

// The second character is the suit of the card
// D for Diamond = Carreaux
// S for Spades = Piques
// C for Club = Treffles
// H for Hearts = Coeur
export type Suit = "D" | "S" | "C" | "H";

export type Card = {
    suit: Suit;
    rank: Rank;
    value: number;
}
export type Cards = Card[];

// Define the prediction interface
// The prediction interface is used to represent the prediction of the model
// The prediction is represented by the detection_id, class, confidence, x, y, width, and height
export type CardClass = `${Rank}${Suit}`;

