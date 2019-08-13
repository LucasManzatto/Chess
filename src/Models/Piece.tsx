import {Piece as PieceType} from '../Models/Board';
export interface Pieces{
    white: Piece[];
    black: Piece[];
}
export interface Piece {
    name?: PieceType;
    img?: string;
    asciiImg?: string;
}
