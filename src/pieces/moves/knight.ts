import { Move } from "./Move";
import basicExecute from "./basicExecute";
import { Piece } from "../Piece";

const knight = (rank: number, file: number, boardHistory: ((Piece | null)[][])[]) => {
    const board = boardHistory[0];
    const moves: [number, number][] = [];

    const knightMoves: [number, number][] = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
    ];

    for (const [dx, dy] of knightMoves) {
        const newRank = rank + dx;
        const newFile = file + dy;

        if (newRank >= 0 && newRank < 8 && newFile >= 0 && newFile < 8) {
            if (!board[newRank][newFile] || board[newRank][newFile]?.color !== board[rank][file]?.color) {
                moves.push([newRank, newFile]);
            }
        }
    }

    return moves;
};


const move: Move = {
    name: "Knight",
    getAvailableMoves: knight,
    executeMove: basicExecute(knight)
}

export default move