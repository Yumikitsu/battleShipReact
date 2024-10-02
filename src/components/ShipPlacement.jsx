import { useEffect, useState } from "react"
import '../App.css'

function ShipPlacement ({ board, setBoard, onCompleted, player }) {
    const [shipsLeft, setShipsLeft] = useState([2, 3, 3, 4, 5])
    const [shipsPlaced, setShipsPlaced] = useState([])
    const [firstSelection, setFirstSelection] = useState(-1)
    const [secondSelection, setSecondSelection] = useState(-1)

    useEffect(() => {
        if(shipsPlaced.length === 5) {
            setShipsLeft([2, 3, 3, 4, 5])
            setShipsPlaced([])
            setFirstSelection(-1)
            setSecondSelection(-1)
            onCompleted(player)
        }
    }, [shipsPlaced])

    useEffect(() => {
        if(secondSelection !== -1) {
            // Place the new selection
            // If firstSquare x and secondSquare x is the same:
            let length = 0
            let ids = []
            if(board[firstSelection].x === board[secondSelection].x) {
                length = Math.abs(board[firstSelection].y - board[secondSelection].y) + 1
                // Column Goes Down, Id moves 8 steps
                if(secondSelection > firstSelection) {
                    for(let i = firstSelection; i <= secondSelection; i += 8) {
                        ids.push(i)
                    }
                } else { // Column Goes Up, Id moves 8 steps
                    for(let i = secondSelection; i <= firstSelection; i += 8) {
                        ids.push(i)
                    }
                }
            } else if (board[firstSelection].y === board[secondSelection].y) {
                length = Math.abs(board[firstSelection].x - board[secondSelection].x) + 1
                // Row Goes Right, Id moves 1 step
                if(secondSelection > firstSelection) {
                    for(let i = firstSelection; i <= secondSelection; i++) {
                        ids.push(i)
                    }
                } else { // Row Goes Left, Id moves 1 step
                    for(let i = secondSelection; i <= firstSelection; i++) {
                        ids.push(i)
                    }
                }
            }
            console.log(ids)

            // Check if the squares the ship will cover are unoccupied
            let allUnoccupied = true
            if(ids.length > 0) {
                for(let i = 0; i < ids.length; i++) {
                    if(board[ids[i]].occupied === true) {
                        allUnoccupied = false
                    }
                }
            } else {
                allUnoccupied = false
            }

            console.log(allUnoccupied)

            if(allUnoccupied) {
                switch(length) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        if (shipsLeft.includes(length)) {
                            setBoard(current => (
                                current.map(square =>
                                    (ids.includes(square.id) ? { ...square, occupied: true} : square)
                                )
                            ))
                            setShipsPlaced(current => [...current, length])
                            setShipsLeft(current => {
                                const index = current.findIndex(ship => ship === length)
                                if (index !== -1) {
                                    return [...current.slice(0, index), ...current.slice(index + 1)]
                                }
                                return current
                            })
                        }
                        break;
                    default:
                        break;
                }
            }

            // Reset
            setFirstSelection(-1)
            setSecondSelection(-1)
        }
    }, [secondSelection])

    const handlePlacement = (id) => {
        // If the same is selected, reset it
        if(firstSelection === id) {
            setFirstSelection(-1)
            return
        }
        if(firstSelection !== -1) {
            setSecondSelection(id)
        } else {
            setFirstSelection(id)
        }
    }

    return (
        <>
        <article className="Placement">
            <h1>Player {player}, Place Down Ships With Size: {shipsLeft.join(', ')}</h1>
            <div className="PlacementFull">
                <div className="PlacementSquares">
                    {board.map(square => (
                    <div key={square.id} className="Placement-button-div">
                        <button className="Placement-button" onClick={() => handlePlacement(square.id)}>{square.occupied ? "O" : (square.id === firstSelection ? "X" : "")}</button>
                    </div>
                    ))}
                </div>
            </div>
        </article>
        </>
    )
}

export default ShipPlacement