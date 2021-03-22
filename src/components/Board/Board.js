import "./Board.style.css";
import more from "../../images/menu.svg";
import ToodoItem from "../TodoItem/TodoItem";

const Board = ({ data }) => {

    const todo = data.filter(item => item.state === 0);
    const doing = data.filter(item => item.state === 1);
    const done = data.filter(item => item.state === 2);

    const handler = (event) => {
        console.log(event.target)
    }

    return (
        <div className="board">
            <div className="board-header">

            </div>
            <div className="first">
                <div className="flex">
                    <div className="column-header">
                        <p>Todo</p>
                        <img src={more} alt="more icon" />
                    </div>
                    {/* Prints all todo items from data list state 0 */}
                    {todo.map((item) => <ToodoItem key={item.title} info={item} handler={handler}/>)}
                </div>
            </div>
            <div className="mid">
                <div className="flex">
                    <div className="column-header">
                        <p>In-Progress</p>
                        <img src={more} alt="more icon" />
                    </div>
                    {/* Prints all todo items from data list state 1 */}
                    {doing.map((item) => <ToodoItem key={item.title} info={item} handler={handler}/>)}
                </div>
            </div>
            <div className="last">
                <div className="flex">
                    <div className="column-header">
                        <p>Done</p>
                        <img src={more} alt="more icon" />
                    </div>
                    {/* Prints all todo items from data list state 2 */}
                    {done.map((item) => <ToodoItem key={item.title} info={item} handler={handler}/>)}
                </div>
            </div>
        </div>
    )
}

export default Board;