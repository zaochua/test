import './App.css'
import {useState} from "react";

// 组件
function Square({value, onSquareClick}: { value: string, onSquareClick: () => void }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({xIsNext, squares, onPlay}:{xIsNext: boolean, squares: string[], onPlay: (nextSquares: string[]) => void}) {
    // 点击方格
    function handleClick(i: number) {
        // 如果这个格子已经被占用，就结束
        if (squares[i] || calculateWinner(squares)) {
            return
        }
        const newSquares = squares.slice()
        if (xIsNext) {
            newSquares[i] = 'X'
        } else {
            newSquares[i] = 'O'
        }
        // 触发父组件
        onPlay(newSquares)
    }

    // 判断谁赢
    function calculateWinner(squares: string[]) {
        // 赢的可能性索引
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            // 如果三个格都是x或者0  就是赢
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const winner = calculateWinner(squares)
    let status;
    if (winner) {
        status = "胜利: " + winner;
    } else {
        status = "下一个位: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div>{status}</div>
 b             <div className={"board-row"}>
                {/*多个传参*/}
                {/*如果直接handleClick(0)会立即执行，导致无限循环*/}
                {/*<Square value={squares[0]} onSquareClick={handleClick(0)}/>*/}

                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className={"board-row"}>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className={'board-row'}>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    )
}

function Game() {
    // 数组中包含，存储每次变化的数组
    const [history, setHistory] = useState([Array(9).fill(null)])
    // 当前步数索引
    const [currentMove, setCurrentMove] = useState(0);
    // 根据当前步数索引，获取当前数组落子数据
    const currentSquares = history[currentMove]
    // 是否已经下一个人 currentMove变化就会更新xIsNext，xIsNext更新判断页面上谁落子
    const xIsNext = currentMove % 2 === 0

    // 新增历史，设置下一位
    function handlePlay(nextSquares: string[]) {
        // 保留跳转的历史
        // currentMove + 1是拿到当前要跳转的历史包含要跳转的本次，然后加上新的历史
        // 这样落子的时候，从跳转的历史开始，新增历史
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        // 点击更新每次索引
        setCurrentMove(nextHistory.length - 1)
    }

    // 讲history转化li元素
    // 参数加上 _ 代表可以忽略
    const moves = history.map((_squares:string[], move: number) => {
        let description;
        if (move > 0) {
            description = '跳转到' + move + '步'
        } else {
            description = '开始游戏'
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    // 跳转历史
    function jumpTo(move: number) {
        setCurrentMove(move)
    }

    return (
        <div className={"game"}>
            <div className={"game-board"}>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className={"game-info"}>
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )
}

export default Game
