import './App.css'
import Board from './board/Board'
import { ChessBoardProvider } from './contexts/ChessBoard'

function App() {
  return (
    <div className="app">
      <ChessBoardProvider>
        <Board  />
      </ChessBoardProvider>
    </div>
  )
}

export default App
