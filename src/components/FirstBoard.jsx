import { useContext } from "react"
import { GameContext } from "../App"
import Square from "./Square"
import '../App.css'

function FirstBoard ({ onAttack }) {
    const { p1Board } = useContext(GameContext)
    return (
        <>
        {p1Board.map(square => (
            <div key={square.id} className="squareDiv">
                <Square boardSquare={square} onAttack={onAttack} player={0} />
            </div>
        ))}
        </>
    )
}

export default FirstBoard