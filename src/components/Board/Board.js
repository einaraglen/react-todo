import React from "react";
import Tooltip from '@material-ui/core/Tooltip';

import "./Board.style.css";
import ToodoItem from "../TodoItem/TodoItem";
import BoardModal from "./BoardModal"
import add_icon from "../../images/plus.svg";

import { Context } from "../../context/Store";

const Board = () => {

    //Gets the context (global variable and setter)
    const [state, dispatch] = React.useContext(Context);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalState, setModalState] = React.useState(true);
    const [currentItem, setCurrentItem] = React.useState({});

    /**
     * Method to proceed the todo-item to next state,
     * works by mapping the datalist to the displatcher and editing the 
     * todo-item collected by the info.
     * @param {Object} info
     */
    function proceed(info) {
        dispatch({type: "SET_DATA", payload: state.data.map((item) => {
            if (item.title === info.title) {
              const updatedItem = {
                ...item,
                state: item.state + 1,
              };
       
              return updatedItem;
            }
       
            return item;
          })
        });
    }

    /**
     * Method for opening edit modal with the information
     * given from the item Object.
     * @param {Object} item 
     */
    function openEdit(item) {
       setIsOpen(true);
       setModalState(false);
       setCurrentItem(item);
    }

    /**
     * 
     */
    function openAdd() {
        setIsOpen(true);
        setCurrentItem({});
    }

    /**
     * Method for rendering the different boards
     * of the todo site, consists of:
     * - Todo
     * - In-Progress
     * - Done
     * @returns {DOM} boards
     */
    function rendreBoards() {
        let states = [0, 1, 2];
        let classNames = ["first", "mid", "last"];
        let titles = ["Todo", "In-Progress", "Done"]
        return states.map(
            state => <div key={state} className={classNames[state]}>
                        <div className="flex">
                            <div className="column-header">
                                <p>{titles[state]}</p>
                                {/*<img src={more} alt="more icon"*/}
                            </div>
                            {/* Prints all todo items from data list state */}
                            {rendreItems(state)}
                        </div>
                    </div>
        );
    }

    /**
     * Method for rendering the items from the data list
     * returns the items based on the state of the board
     * 0 - 1 - 2
     * @param {Number} currentState 
     * @returns {DOM} Todo-Item
     */
    function rendreItems(currentState) {
        return state.data
            .filter(item => item.state === currentState)
            .map((item) => <ToodoItem key={item.title} info={item} handler={
                (type, info) => (type === "proceed") ? proceed(info) : openEdit(info)
            }/>)
    } 

    return (
        <div className="board">
            <div className="board-header">
                <Tooltip title="Add" placement="right">
                    <img src={add_icon} alt="add icon" onClick={openAdd} />
                </Tooltip>
                <BoardModal 
                    modalIsOpen={modalIsOpen}
                    setIsOpen={setIsOpen}
                    modalState={modalState}
                    setModalState={setModalState}
                    currentItem={currentItem}
                />
            </div>
            {/* All rendering of boards and items is done here */}
           {rendreBoards()}
        </div>
    )
}

export default Board;