import React from "react";
import Modal from 'react-modal';

import "./Board.style.css";
import more from "../../images/menu.svg";
import ToodoItem from "../TodoItem/TodoItem";
import add from "../../images/add.svg";

Modal.setAppElement("#root");

const Board = ({ data }) => {

    //Rendre items code
    const[allData, setAllData] = React.useState(data);

    const handler = (type, info) => {
        (type === "proceed") ? proceed(info) : edit(info);
    }

    const proceed = (info) => {
        const newList = allData.map((item) => {
          if (item.title === info.title) {
            const updatedItem = {
              ...item,
              state: item.state + 1,
            };
     
            return updatedItem;
          }
     
          return item;
        });
     
        setAllData(newList);
      }

    const edit = (info) => {
        console.log("edit");
    }

    const add = (item) => {

    }

    const rendreItems = (state) => {
        return allData
            .filter(item => item.state === state)
            .map((item) => <ToodoItem key={item.title} info={item} handler={handler}/>)
    } 

    //Modal Code
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal(){
        setIsOpen(false);
    }

    const customStyles = {
        content : {
            top                   : '40%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    }

    return (
        <div className="board">
            <div className="board-header">
                <img src={add} alt="add icon" onClick={openModal} />
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modal-content">
                        <p>Add Task</p>
                        <input type="text" placeholder="Title" />
                        <textarea type="text" placeholder="Description" />
                        <button onClick={() => {
                            add();
                            closeModal();
                        }}>Add</button>
                    </div>
                </Modal>
            </div>
            <div className="first">
                <div className="flex">
                    <div className="column-header">
                        <p>Todo</p>
                        <img src={more} alt="more icon" />
                    </div>
                    {/* Prints all todo items from data list state 0 */}
                    {rendreItems(0)}
                </div>
            </div>
            <div className="mid">
                <div className="flex">
                    <div className="column-header">
                        <p>In-Progress</p>
                        <img src={more} alt="more icon" />
                    </div>
                    {/* Prints all todo items from data list state 1 */}
                    {rendreItems(1)}
                </div>
            </div>
            <div className="last">
                <div className="flex">
                    <div className="column-header">
                        <p>Done</p>
                        <img src={more} alt="more icon" />
                    </div>
                    {/* Prints all todo items from data list state 2 */}
                    {rendreItems(2)}
                </div>
            </div>
        </div>
    )
}

export default Board;