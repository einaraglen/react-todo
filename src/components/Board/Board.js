import React from "react";
import Modal from 'react-modal';

import "./Board.style.css";
import more from "../../images/menu.svg";
import ToodoItem from "../TodoItem/TodoItem";
import add_icon from "../../images/plus.svg";

Modal.setAppElement("#root");

const Board = ({ data, setValue }) => {

    let copy = data;

    const [allData, setAllData] = React.useState(data);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalState, setModalState] = React.useState(0);

    //saves the key when edit is open so that we can update title which acts as key
    const [key, setKey] = React.useState("");

    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [error, setError] = React.useState("");

    React.useEffect(() => console.log("updated"));

    const customStyles = {
        content : {
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            background: '#ECF0F1',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            boxShadow: '0px 3px 10px rgba(0,0,0,0.2)'
        },
        overlay: {
            //workaround: modal was not covering header
            zIndex: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.45)'
        }
    }

    function proceed(info) {
        copy = allData.map((item) => {
          if (item.title === info.title) {
            const updatedItem = {
              ...item,
              state: item.state + 1,
            };
     
            return updatedItem;
          }
     
          return item;
        });
        setAllData(copy);
    }
    
    function add() {
        if (!title.trim() || !desc.trim()) {
            setError("Empty field");
        } else {
            if (!used(title)) {
                copy = allData;
                copy.push({
                    title: title,
                    state: 0,
                    description: desc
                })
                setAllData(copy);
                closeModal(); 
            } else {
                setError("Title unavailable");
            }
        }
    }

    function edit() {
        if (!title.trim() || !desc.trim()) {
            setError("Empty field");
        } else {
            if(used(title) && title !== key) {
                setError("Title unavailable");
            } else {
                copy = allData;
                let index = copy.findIndex((item => item.title === key));
                copy[index].title = title;
                copy[index].description = desc; 
                setAllData(copy);
                closeModal();
            }
        }
    }

    function openEdit(info) {
        setModalState(1);
        openModal();
        setTitle(info.title);
        setDesc(info.description);
        setKey(info.title);
    }

    function used(key) {
        let found = false;
        allData.forEach((item) => {
            if(item.title === title) {
                found = true;
            }
        });

        return found;
    }

    function rendreItems(state) {
        return allData
            .filter(item => item.state === state)
            .map((item) => <ToodoItem key={item.title} info={item} handler={
                (type, info) => (type === "proceed") ? proceed(info) : openEdit(info)
            }/>)
    } 

    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal(){
        setError("");
        setTitle("");
        setDesc("");
        setIsOpen(false);
        setModalState(0);
    }

    return (
        <div className="board">
            <div className="board-header">
                <img src={add_icon} alt="add icon" onClick={openModal} />
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modal-content">
                        <p>{(modalState === 0) ? "Add " : "Edit "}Task</p>
                        <input type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />
                        <textarea type="text" placeholder="Description" value={desc} onChange={event => setDesc(event.target.value)} />
                        {
                            (modalState === 0) ? null : (null)
                        }
                        <button onClick={(modalState === 0) ? add : edit} >{(modalState === 0) ? "Add" : "Edit"}</button>
                        <p className="info-text">{error}</p>
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