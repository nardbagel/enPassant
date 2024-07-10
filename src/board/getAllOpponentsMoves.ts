import { Piece } from "../pieces/Piece";

const getAllOpponentsMoves = (color: "w" | "b", boardHistory: ((Piece | null)[][])[]): [rank: number, file: number][] => {
    const board = boardHistory[0]
    let moves: Record<string, boolean> = {}
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = board[rank][file];
            if (piece && piece.color !== color) {
                piece.moves.flatMap(move => (move.name !== "Pawn Push" ? move.getAvailableMoves(rank, file, boardHistory): [])).forEach(([r, f]) => {
                    moves[[r, f].toString()] = true;
                });
            }
        }
    }
    return Object.keys(moves).reduce((acc, move) => {
        JSON.parse(move).forEach((square: [number, number]) => acc.push(square));
        return acc;
    }, [] as [rank: number, file: number][]);
}

export default getAllOpponentsMoves