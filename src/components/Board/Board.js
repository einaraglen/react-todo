import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

    const [key, setKey] = React.useState("Work");

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

    function openEdit(item) {
       setIsOpen(true);
       setModalState(false);
       setCurrentItem(item);
    }

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

    function rendreItems(currentState) {
        return state.data
            .filter(item => item.state === currentState)
            .map((item) => <ToodoItem key={item.title} info={item} handler={
                (type, info) => (type === "proceed") ? proceed(info) : openEdit(info)
            }/>)
    } 

    function openModal() {
        setIsOpen(true);
    }

    function handleChange(event) {
        setKey(event.target.value);
      }
    
    return (
        <div className="board">
            <div className="board-header">
                <Tooltip title="Add" placement="right">
                    <img src={add_icon} alt="add icon" onClick={openModal} />
                </Tooltip>
                <Select className="select" value={key} onChange={handleChange} disableUnderline>
                    <MenuItem value="10">Work</MenuItem>
                    <MenuItem value="20">Home</MenuItem>
                </Select>
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