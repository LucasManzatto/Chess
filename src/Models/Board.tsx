export class Board {
    openings : any[] = [];
    subOpenings : any[] = [];
    clickedPiece : string = "";
    possibleSquares : any[] = [];
    fen : string = "";
    pgn : string = "";
    inCheck: boolean= false;
    checkmate : boolean = false;
    turn : string = 'w';
    jogadas : any[] = [];
    lastSquares : LastSquares = new LastSquares();
    dimensions : Dimensions = new Dimensions();
    capturedPieces: CapturedPieces = new CapturedPieces();
    cellWidth: number = 0;
}

export class LastSquares{
    from : string = "";
    to : string = "";
}

export class Dimensions{
    height: number= 0;
    width: number = 0;
}
export class CapturedPieces{
    white: string[] = [];
    black: string[] = [];
}