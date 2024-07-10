import { useState, useMemo } from "react"
import { Piece } from "../pieces/Piece"
import "./board.css"
import { useChessBoard } from "../contexts/ChessBoard"

const Board = () => { 
    const { boardHistory, addMove, addBoardHistory } = useChessBoard()
    const [turn, setTurn] = useState("w")
    const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null)

    const availableMoves = useMemo(() => {
        if (!selectedSquare) return []
        const selectedPiece = boardHistory[0][selectedSquare[0]][selectedSquare[1]]
        if (!selectedPiece || selectedPiece.color !== turn || !selectedSquare) return []
        return selectedPiece.moves.flatMap(move => move.getAvailableMoves(selectedSquare[0], selectedSquare[1], boardHistory))
    }, [selectedSquare, boardHistory])

    const handleSquareClick = (newRank: number, newFile: number) => {
        const piece = boardHistory[0][newRank][newFile]
        if (piece?.color === turn) {
            setSelectedSquare([newRank, newFile])
            return
        }

        if (!selectedSquare || !availableMoves.some(([r, f]) => r === newRank && f === newFile)) {
            setSelectedSquare(null)
            return
        }
        const selectedPiece = boardHistory[0][selectedSquare[0]][selectedSquare[1]]
        const executeFxn = selectedPiece?.moves.filter(move => move.getAvailableMoves(selectedSquare[0], selectedSquare[1], boardHistory).some(([r, f]) => r === newRank && f === newFile))[0].executeMove
        executeFxn?.(newRank, newFile, selectedSquare[0], selectedSquare[1], boardHistory, addBoardHistory, addMove)
        setTurn(turn === "w" ? "b" : "w")
        setSelectedSquare(null)
    }

    return (
        <div>
            <h1>Chess</h1>
            <div className="board">
                {boardHistory[0].map((row, rank) => (
                    <div className="row" key={rank}>
                        {row.map((piece: Piece | null, file) => (
                            <div onClick={() => handleSquareClick(rank, file)} key={file} className={`square ${availableMoves.some(([r, f]) => r === rank && f === file) ? "possible " : ""}${selectedSquare?.[0] === rank && selectedSquare?.[1] === file ? "selected " : ""}${(rank + file) % 2 === 0 ? "w" : "b"}`}>
                                {piece && <img src={piece.image} alt={piece.name} />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Board

type Board = (Piece | null)[][]

export { Board }