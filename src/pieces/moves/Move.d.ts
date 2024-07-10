type Board = (Piece | null)[][];

type GetAvailableMoves = (rank: number, file: number, boardHistory: Board[]) => [rank: number, file: number][];

type ExecuteMove = (rank: number, file: number, newRank: number, newFile: number, boardHistory: Board[], addBoardHistory: (board: Board) => void, addMove: (move: string) => void) => void;

type Move = {
    name: string,
    getAvailableMoves: GetAvailableMoves,
    executeMove: ExecuteMove
}

export { Move };