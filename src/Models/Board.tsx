import { Turn } from "./Turn";
import { LastSquares } from "./LastSquares";
import { Square } from "./Square";

export interface Board {
	notation: string;
    fen: string;
    pgn: string;
    position?: any;
    turn: Turn;
    lastSquares: LastSquares;
    checkmate: boolean;
    inCheck: boolean;
}