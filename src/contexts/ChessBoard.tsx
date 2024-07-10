import { createContext, useState, ReactNode, FunctionComponent, useMemo, useContext } from "react";
import initialBoard from "../board/board";
import { Piece } from "../pieces/Piece";

type Board = (Piece | null)[][]

type ChessBoardProviderProps = {
  children: ReactNode
}

const ChessBoardContext = createContext<{boardHistory: Board[], moveHistory: string[], addMove: ((move: string) => void) | (() => void), addBoardHistory: ((board: Board) => void) | (() => void)}>({ boardHistory: [initialBoard], moveHistory: [], addMove: () => {}, addBoardHistory: () => {}});

const ChessBoardProvider: FunctionComponent<ChessBoardProviderProps> = ({ children }) => {
    const [boardHistory, setBoardHistory] = useState<Board[]>([initialBoard])
    const [moveHistory, setMoveHistory] = useState<string[]>([])
  
    const addMove = (move: string) => {
      setMoveHistory(prev => [move, ...prev])
    }
  
    const addBoardHistory = (board: Board) => { 
      setBoardHistory(prev => [board, ...prev])
    }
  
    const value = useMemo(() => 
      ({ boardHistory, moveHistory, addMove, addBoardHistory }), 
    [boardHistory, moveHistory, addMove, addBoardHistory])

    return (
        <ChessBoardContext.Provider value={value}>
            {children}
        </ChessBoardContext.Provider>
    )
}

const useChessBoard = () => useContext(ChessBoardContext)

export default ChessBoardContext;
export { ChessBoardProvider, ChessBoardContext, useChessBoard }