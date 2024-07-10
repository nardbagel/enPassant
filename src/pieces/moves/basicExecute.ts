import { Piece } from "../Piece";

export default (getAvailableMoves: (rank: number, file: number, boardHistory: ((Piece | null)[][])[]) => [rank: number, file: number][]) => (newRank: number, newFile: number, rank: number, file: number, boardHistory: ((Piece | null)[][])[], addBoardHistory: (board: (Piece | null)[][]) => void, addMove: (newMove: string) => void) => {
    const boardCopy = boardHistory[0].map(row => row.map(piece => piece).slice());
    const possibleMoves = getAvailableMoves(rank, file, boardHistory);
    if (!boardCopy[rank][file] || possibleMoves.some(([pRank, pFile]) => pRank === rank && pFile === file)) return;
    const didTake = boardCopy[newRank][newFile] !== null
    const piece = boardCopy[rank][file]

    addMove(`${piece.color}${boardCopy[rank][file]?.name[0]} ${String.fromCharCode(97 + file)}${8 - rank} ${didTake ? "takes" : "to" } ${String.fromCharCode(97 + newFile)}${8 - newRank}`)
    
    if(piece && piece.hasMoved === false) 
        piece.hasMoved = true
    boardCopy[newRank][newFile] = piece
    boardCopy[rank][file] = null
    addBoardHistory(boardCopy)
}