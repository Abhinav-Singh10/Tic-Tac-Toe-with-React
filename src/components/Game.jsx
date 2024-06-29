import {useState} from 'react';
import { Board } from './Board';


export function Game(){
    const [squares,setSquares]= useState(Array(9).fill(null));
    const [isXNext, setIsXNest]=useState(true);

    function handleClick(i){
        const newSqaures=squares.slice();
        if(calculateWinner(newSqaures) || newSqaures[i]){
            return;
        }
        newSqaures[i]= isXNext? 'X':'O';
        setSquares(newSqaures);
        setIsXNest(!isXNext);
    }

    const handleRestart =() =>{
        setSquares(Array(9).fill(null));
        setIsXNest(true);
    }

    const winner= calculateWinner(squares);
    let status;
    if(winner){
        status=`Winner: ${winner}`;
    } else if(squares.every(square => square!==null)){
        status="Draw!";
    } else{
        status=`Next player: ${isXNext ? 'X':'O'}`;
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board squares={squares} onClick={handleClick} />
            </div>

            <div className="game-info">
                <div>{status}</div>
                <button onClick={handleRestart}>Restart Game</button>
            </div>
        </div>
    )
}

function calculateWinner(squares) {
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] ===squares[c]){
            return squares[a];
        }
    }
    return null;
}