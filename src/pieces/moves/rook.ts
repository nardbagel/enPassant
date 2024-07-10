import { Move } from "./Move";
import basicExecute from "./basicExecute";
import { Piece } from "../Piece";

const rook = (rank: number, file: number, boardHistory: ((Piece | null)[][])[]) => {
    const moves: [number, number][] = [];
    const board = boardHistory[0];

    for (let i = file + 1; i < 8; i++) {
        if (board[rank][i]) {
            if (board[rank][i]?.color !== board[rank][file]?.color) {
                moves.push([rank, i] as [number, number]);
            }
            break;
        }
        moves.push([rank, i] as [number, number]);
    }

    for (let i = file - 1; i >= 0; i--) {
        if (board[rank][i]) {
            if (board[rank][i]?.color !== board[rank][file]?.color) {
                moves.push([rank, i] as [number, number]);
            }
            break;
        }
        moves.push([rank, i] as [number, number]);
    }

    for (let i = rank + 1; i < 8; i++) {
        if (board[i][file]) {
            if (board[i][file]?.color !== board[rank][file]?.color) {
                moves.push([i, file] as [number, number]);
            }
            break;
        }
        moves.push([i, file] as [number, number]);
    }

    for (let i = rank - 1; i >= 0; i--) {
        if (board[i][file]) {
            if (board[i][file]?.color !== board[rank][file]?.color) {
                moves.push([i, file] as [number, number]);
            }
            break;
        }
        moves.push([i, file] as [number, number]);
    }

    return moves;
};

const move: Move = {
    name: "rook",
    getAvailableMoves: rook,
    executeMove: basicExecute(rook)
}

export default move