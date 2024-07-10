import { Move } from "./Move";
import basicExecute from "./basicExecute";
import { Piece } from "../Piece";

const bishop = (rank: number, file: number, boardHistory: ((Piece | null)[][])[]) => {
    const board = boardHistory[0]
    const piece = board[rank][file]
    if (!piece) return []
    const moves = []

    for (let i = 1; i < 8; i++) {
        if (rank + i > 7 || file + i > 7) break
        if (!board[rank + i][file + i]) {
            moves.push([rank + i, file + i] as [number, number])
        } else if (board[rank + i][file + i]?.color !== piece.color) {
            moves.push([rank + i, file + i] as [number, number])
            break
        } else {
            break
        }
    }

    for (let i = 1; i < 8; i++) {
        if (rank - i < 0 || file - i < 0) break
        if (!board[rank - i][file - i]) {
            moves.push([rank - i, file - i] as [number, number])
        } else if (board[rank - i][file - i]?.color !== piece.color) {
            moves.push([rank - i, file - i] as [number, number])
            break
        } else {
            break
        }
    }

    for (let i = 1; i < 8; i++) {
        if (rank + i > 7 || file - i < 0) break
        if (!board[rank + i][file - i]) {
            moves.push([rank + i, file - i] as [number, number])
        } else if (board[rank + i][file - i]?.color !== piece.color) {
            moves.push([rank + i, file - i] as [number, number])
            break
        } else {
            break
        }
    }

    for (let i = 1; i < 8; i++) {
        if (rank - i < 0 || file + i > 7) break
        if (!board[rank - i][file + i]) {
            moves.push([rank - i, file + i] as [number, number])
        } else if (board[rank - i][file + i]?.color !== piece.color) {
            moves.push([rank - i, file + i] as [number, number])
            break
        } else {
            break
        }
    }
    
    return moves
}

const move: Move = {
    name: "Bishop",
    getAvailableMoves: bishop,
    executeMove: basicExecute(bishop)
}

export default move