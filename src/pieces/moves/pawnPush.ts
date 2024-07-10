import { Move } from "./Move";
import basicExecute from "./basicExecute";
import { Piece } from "../Piece";

const pawnPush = (rank: number, file: number, boardHistory: ((Piece | null)[][])[]) => {
    const board = boardHistory[0]
    const piece = board[rank][file]
    if (!piece) return []
    const direction = piece.color === "w" ? -1 : 1
    const moves = []

    if (!piece.hasMoved && !board[rank + direction][file] && !board[rank + (2 * direction)][file]) {
        moves.push([rank + (2 * direction), file] as [number, number])
    }

    if (!board[rank + direction][file]) {
        moves.push([rank + direction, file] as [number, number])
    }

    return moves
}

const move: Move = {
    name: "Pawn Push",
    getAvailableMoves: pawnPush,
    executeMove: basicExecute(pawnPush)
}

export default move