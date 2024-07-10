import { Move } from "./Move";
import getAllOpponentsMoves from "../../board/getAllOpponentsMoves";
import { Piece } from "../Piece";

const castle = (rank: number, file: number, boardHistory: ((Piece | null)[][])[]) => {
    const board = boardHistory[0]
    const piece = board[rank][file]

    if (!piece) return []
    const moves = []

    if (!piece.hasMoved) {
        if (!board[rank][0]?.hasMoved) {
            if (!board[rank][1] && !board[rank][2] && !board[rank][3]) {
                moves.push([rank, 2] as [number, number])
            }
        }

        if (!board[rank][7]?.hasMoved) {
            if (!board[rank][5] && !board[rank][6]) {
                moves.push([rank, 6] as [number, number])
            }
        }
    }

    return moves
}

const move: Move = {
    name: "Castle",
    getAvailableMoves: castle,
    executeMove: (newRank: number, newFile: number, rank: number, file: number, boardHistory: ((Piece | null)[][])[], addBoardHistory: ((board: (Piece | null)[][]) => void), addMove: ((move: string) => void)) => {
        const boardCopy = boardHistory[0].map(row => row.map(piece => piece).slice());
        const possibleMoves = castle(rank, file, boardHistory);
        if (!boardCopy[rank][file] || !(possibleMoves.some(move => move[0] === rank && move[1] === file) )) return;
        const didTake = boardCopy[newRank][newFile] !== null
        const piece = boardCopy[rank][file]
        const opponentsMoves = getAllOpponentsMoves(piece.color, boardHistory)
        let canCastle = true
        const files = [...Array(8).keys()]
        
        if (newFile < file){
            files.splice(0, file)
        } else {
            files.splice(file + 1, 8)
        }

        opponentsMoves.forEach(attack => {
            files.forEach(f => {
                if (attack[1] === f) {
                    canCastle = false
                }
            })
        })

        if(!canCastle) return

        addMove(`${piece.color}${boardCopy[rank][file]?.name[0]} ${String.fromCharCode(97 + file)}${8 - rank} ${didTake ? "takes" : "to" } ${String.fromCharCode(97 + newFile)}${8 - newRank}`)
        
        if(piece && piece.hasMoved === false) 
            piece.hasMoved = true
        boardCopy[newRank][newFile] = piece
        boardCopy[rank][file] = null
        addBoardHistory(boardCopy)
    }
}

export default move