import { LastSquares } from "./Board";

export interface Move {
	jogada?: any;
	notation?: string;
    fen?: string;
    position?: any;
    turn?: string;
    lastSquares: LastSquares;
}