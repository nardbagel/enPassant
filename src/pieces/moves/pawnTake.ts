import { Move } from "./Move";
import basicExecute from "./basicExecute";
import { Piece } from "../Piece";

const pawnTake = (rank: number, file: number, boardHistory: ((Piece | null)[][])[]) => {
    const board = boardHistory[0]
    const piece = board[rank][file]
    if (!piece) return []
    const direction = piece.color === "w" ? -1 : 1
    const moves = []

    if (board[rank + direction][file - 1] && board[rank + direction][file - 1]?.color !== piece.color) {
        moves.push([rank + direction, file - 1] as [number, number])
    }

    if (board[rank + direction][file + 1] && board[rank + direction][file + 1]?.color !== piece.color) {
        moves.push([rank + direction, file + 1] as [number, number])
    }

    return moves
}

const move: Move = {
    name: "Pawn Take",
    getAvailableMoves: pawnTake,
    executeMove: basicExecute(pawnTake)
}

export default move