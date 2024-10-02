import { useContext } from "react"
import { GameContext } from "../App"
import Square from "./Square"
import '../App.css'

function SecondBoard ({ onAttack }) {
    const { p2Board } = useContext(GameContext)
    return (
        <>
        {p2Board.map(square => (
            <div key={square.id} className="squareDiv">
                <Square boardSquare={square} onAttack={onAttack} player={1} />
            </div>
        ))}
        </>
    )
}

export default SecondBoard