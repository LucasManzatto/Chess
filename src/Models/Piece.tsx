export interface Pieces{
    white: Piece[];
    black: Piece[];
}
export interface Piece {
    name?: string;
    img?: string;
    asciiImg?: string;
}