import { createContext, useEffect, useState } from 'react'
import './App.css'
import { board } from './assets/board'
import FirstBoard from './components/FirstBoard'
import SecondBoard from './components/SecondBoard'
import ShipPlacement from './components/ShipPlacement'
export const GameContext = createContext()

function App() {
  const [p1Board, setP1Board] = useState(board)
  const [p2Board, setP2Board] = useState(board)
  const [turn, setTurn] = useState(0)
  const [p1ShipsPlaced, setP1ShipsPlaced] = useState(false)
  const [p2ShipsPlaced, setP2ShipsPlaced] = useState(false)
  const [p1Points, setP1Points] = useState(0)
  const [p2Points, setP2Points] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const handleAllShipsPlaced = (player) => {
    if(player === 1) {
      setP1ShipsPlaced(true)
    } else {
      setP2ShipsPlaced(true)
    }
  }

  useEffect(() => {
    if(p1Points === 17 || p2Points === 17) {
      setGameOver(true)
    }
  }, [p1Points, p2Points])

  const handleAttack = (id) => {
    if(turn === 0) {
      setP2Board(prevBoard => (
        prevBoard.map(square => 
          square.id === id ? { ...square, hit: true} : square
        )
      ))
      if(p2Board[id].occupied) {
        const points = p2Board.filter(squares => squares.occupied && squares.hit).length + 1
        setP1Points(points)
      } else {
        setTurn(1)
      }
    } else {
      setP1Board(prevBoard => (
        prevBoard.map(square => 
          square.id === id ? { ...square, hit: true} : square
        )
      ))
      if(p1Board[id].occupied) {
        const points = p1Board.filter(squares => squares.occupied && squares.hit).length + 1
        setP2Points(points)
      } else {
        setTurn(0)
      }
    }
  }

  const handleReset = () => {
    setP1Board(board)
    setP2Board(board)
    setTurn(0)
    setP1ShipsPlaced(false)
    setP2ShipsPlaced(false)
    setP1Points(0)
    setP2Points(0)
    setGameOver(false)
  }

  return (
    <>
    {!p1ShipsPlaced ? (
      <ShipPlacement board={p1Board} setBoard={setP1Board} onCompleted={handleAllShipsPlaced} player={1} />
    ) : !p2ShipsPlaced ? (
      <ShipPlacement board={p2Board} setBoard={setP2Board} onCompleted={handleAllShipsPlaced} player={2} />
    ) : !gameOver ? (
      <>
        <h1 className="TurnText">Player {turn + 1}{`'s`} turn</h1>
        <div className="Battleship-Game">
          <GameContext.Provider value={{p1Board, setP1Board, p2Board, setP2Board, turn}}>
            <div className="FirstBoard">
              <FirstBoard onAttack={handleAttack} />
            </div>
            <div className="SecondBoard">
              <SecondBoard className="SecondBoard" onAttack={handleAttack} />
            </div>
          </GameContext.Provider>
        </div>
      </>
    ) : (
      <>
      <h1 className="GameOverText">Player {p1Points === 17 ? "1" : "2"} wins!</h1>
      <div className="GameOverDiv">
        <button className="GameOverButton" onClick={handleReset}>Play Again</button>
      </div>
      </>
    )}
    </>
  )
}

export default App
