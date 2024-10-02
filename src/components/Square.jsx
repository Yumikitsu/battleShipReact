import { useContext } from "react"
import { GameContext } from "../App"
import '../App.css'

function Square ({ boardSquare, onAttack, player }) {
    const { turn } = useContext(GameContext)

    const handleClick = () => {
        if(!boardSquare.hit && turn !== player) {
            onAttack(boardSquare.id)
        }
    }
    return (
        <>
            <button className="BoardSquare" onClick={handleClick}>{boardSquare.hit ? (boardSquare.occupied ? "O" : "X") : ""}</button>
        </>
    )
}

export default Square