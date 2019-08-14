import { Turn } from "./Turn";
import { Board } from "./Board";
import { Square } from "./Square";
import { LastSquares } from "./LastSquares";

export class State {
    openings: any[] = [];
    subOpenings: any[] = [];
    clickedPiece: Square = "";
    board?: Board;
    boardHistory: Board[] = [];
    capturedPieces: CapturedPieces = new CapturedPieces();
    possibleSquares: Square[] = [];
}

export type Piece = "P" | "N" | "B" | "Q" | "K" | "R" | "p" | "n" | "b" | "q" | "k" | "r" | "";

export class CapturedPieces {
    white: Piece[] = [];
    black: Piece[] = [];
}