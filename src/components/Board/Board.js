import React from "react";
import Modal from 'react-modal';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

import "./Board.style.css";
import ToodoItem from "../TodoItem/TodoItem";
import add_icon from "../../images/plus.svg";

Modal.setAppElement("#root");

const Board = ({ data, updateData }) => {

    let copy = data;

    const [allData, setAllData] = React.useState(data);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalState, setModalState] = React.useState(true);

    //saves the key when edit is open so that we can update title which acts as key
    const [key, setKey] = React.useState("");

    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [error, setError] = React.useState("");

    const [selectedValue, setSelectedValue] = React.useState(0);

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
        updateData(copy);
        setAllData(copy);
    }

    function addItem() {
        if (!title.trim() || !desc.trim()) {
            setError("Empty field");
        } else {
            if (!used(title)) {
                copy = allData.map(item => item);
                copy.push({
                    title: title,
                    state: 0,
                    description: desc
                })
                updateData(copy);
                setAllData(copy);
                closeModal(); 
            } else {
                setError("Title unavailable");
            }
        }
    }

    function editItem() {
        if (!title.trim() || !desc.trim()) {
            setError("Empty field");
        } else {
            if(used(title) && title !== key) {
                setError("Title unavailable");
            } else {
                copy = allData.map((item) => {
                    if (item.title === key) {
                      const updatedItem = {
                        ...item,
                        title: title,
                        state: selectedValue,
                        description: desc
                      };
               
                      return updatedItem;
                    }
               
                    return item;
                });
                updateData(copy);
                setAllData(copy);
                closeModal();
            }
        }
    }

    function handleRadio(event) {
        setSelectedValue(parseInt(event.target.value))
    }

    //We straight up filter out the item with same key(title) as item we want deleted
    //and store this filtred array as our new render array.
    function deleteItem() {
        copy = allData.filter(item => item.title !== key);
        updateData(copy);
        setAllData(copy);
        closeModal();
    }

    function openEdit(info) {
        setModalState(false);
        openModal();
        setTitle(info.title);
        setDesc(info.description);
        setKey(info.title);
        setSelectedValue(info.state);
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
        setModalState(true);
    }

    return (
        <div className="board">
            <div className="board-header">
                <Tooltip title="Add" placement="right">
                    <img src={add_icon} alt="add icon" onClick={openModal} />
                </Tooltip>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modal-content">
                        <p>{(modalState) ? "Add " : "Edit "}Task</p>
                        <input type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />
                        <textarea type="text" placeholder="Description" value={desc} onChange={event => setDesc(event.target.value)} />
                        {
                            (modalState) ? null : (
                                <div>
                                    <FormControlLabel
                                            control={<Radio value="0" onChange={handleRadio} checked={selectedValue === 0} color="default" />}
                                            label="Todo"
                                            labelPlacement="top"
                                        />
                                        <FormControlLabel
                                            control={<Radio value="1" onChange={handleRadio} checked={selectedValue === 1}  color="default" />}
                                            label="In-Progress"
                                            labelPlacement="top"
                                        />
                                        <FormControlLabel
                                            control={<Radio value="2" onChange={handleRadio} checked={selectedValue === 2}  color="default" />}
                                            label="Done"
                                            labelPlacement="top"
                                        />
                                </div>
                            )
                        }
                        <div className="buttons">
                            <button className="first-button" onClick={(modalState) ? addItem : editItem} >{(modalState) ? "Add" : "Save Changes"}</button>
                            <button className={(modalState) ? "back" : "delete"} onClick={(modalState) ? closeModal : deleteItem}>{(modalState) ? "Back" : "Delete"}</button>
                        </div>
                        <p className="info-text">{error}</p>
                    </div>
                </Modal>
            </div>
            {/* All rendering of boards and items is done here */}
           {rendreBoards()}
        </div>
    )
}

export default Board;