import { Move } from "./Move";
import basicExecute from "./basicExecute";
import { Piece } from "../Piece";

const king = (rank: number, file: number, boardHistory: ((Piece | null)[][])[]) => {
    const board = boardHistory[0]
    const piece = board[rank][file]
    if (!piece) return []
    const moves: [number, number][] = []
    const directions = [-1, 0, 1]

    directions.forEach(directionRank => {
        directions.forEach(directionFile => {
            if (directionRank === 0 && directionFile === 0) return
            if (board[rank + directionRank]?.[file + directionFile]?.color !== piece.color)
                moves.push([rank + directionRank, file + directionFile] as [number, number])
        })
    })

    return moves
}

const move: Move = {
    name: "King",
    getAvailableMoves: king,
    executeMove: basicExecute(king)
}

export default move