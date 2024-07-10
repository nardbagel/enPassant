import { Move } from "./Move";
import { Piece } from "../Piece";

const enPassant = (rank: number, file: number, boardHistory: ((Piece | null)[][])[]) => {
    const board = boardHistory[0]
    const prevBoard = boardHistory[1]
    
    const piece = board[rank][file]
    if (!piece) return []
    const direction = piece.color === "w" ? -1 : 1
    const moves = []

    if(prevBoard[rank + 2 * direction][file + 1]?.color !== piece.color && prevBoard[rank + 2 * direction][file + 1]?.name === "pawn" && board[rank][file + 1]?.color !== piece.color && board[rank][file + 1]?.name === "pawn") {
        moves.push([rank + direction, file + 1] as [number, number])
    }

    if(prevBoard[rank + 2 * direction][file - 1]?.color !== piece.color && prevBoard[rank + 2 * direction][file - 1]?.name === "pawn" && board[rank][file - 1]?.color !== piece.color && board[rank][file - 1]?.name === "pawn") {
        moves.push([rank + direction, file - 1] as [number, number])
    }

    return moves
}

const move: Move = {
    name: "enPassant",
    getAvailableMoves: enPassant,
    executeMove: (newRank: number, newFile: number, rank: number, file: number, boardHistory: ((Piece | null)[][])[], addBoardHistory: ((board: (Piece | null)[][]) => void), addMove: ((move: string) => void)) => {
        const boardCopy = boardHistory[0].map(row => row.map(piece => piece).slice());
        const possibleMoves = enPassant(rank, file, boardHistory);
        if (!boardCopy[rank][file] || !(possibleMoves.some(move => move[0] === rank && move[1] === file) )) return;
        const didTake = boardCopy[newRank][newFile] !== null
        const piece = boardCopy[rank][file]
        const direction = piece.color === "w" ? -1 : 1
        addMove(`${piece.color}${boardCopy[rank][file]?.name[0]} ${String.fromCharCode(97 + file)}${8 - rank} ${didTake ? "takes" : "to" } ${String.fromCharCode(97 + newFile)}${8 - newRank}`)
        
        if(piece && piece.hasMoved === false) 
            piece.hasMoved = true
        boardCopy[newRank][newFile] = piece
        boardCopy[rank][file] = null
        boardCopy[newRank - direction][newFile] = null
        addBoardHistory(boardCopy)
    }
}

export default move