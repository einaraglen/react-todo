import React from "react";
import Modal from 'react-modal';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

import "./Board.style.css";
import ToodoItem from "../TodoItem/TodoItem";
import add_icon from "../../images/plus.svg";

import { Context } from "../../context/Store";

Modal.setAppElement("#root");

//Kinda serializes your data, so that it persists between refreshes
//Uses JSON parsing so we can get back the object list we sendt into it
//And ofc we give it an empty array if no session data is found (this helps to not break absolutly erything)
const useStateWithLocalStorage = (localStorageKey) => {

    const [data, setData] = React.useState(
      (localStorage.length !== 0) ? JSON.parse(localStorage.getItem(localStorageKey)) : []
    );
   
    //stores data list on re-render
    React.useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    }, [localStorageKey, data]);
   
    return [data, setData];
}

const Board = () => {

    const [data, setData] = useStateWithLocalStorage("data");

    const [state, dispatch] = React.useContext(Context);

    let copy = data;

    //re-saves the context / global-variable on re-rendre
    React.useEffect(() => {
        dispatch({type: "SET_DATA", payload: data});
    }, [dispatch, data]);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalState, setModalState] = React.useState(true);

    //saves the key when edit is open so that we can update title which acts as key
    const [key, setKey] = React.useState("");

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
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
        setData(state.data.map((item) => {
            if (item.title === info.title) {
              const updatedItem = {
                ...item,
                state: item.state + 1,
              };
       
              return updatedItem;
            }
       
            return item;
          }));
    }

    function addItem() {
        if (!title.trim() || !description.trim()) {
            setError("Empty field");
        } else {
            if (!used(title)) {
                copy = [...state.data];
                copy.push({
                    title: title,
                    state: 0,
                    description: description
                })
                setData(copy);
                closeModal(); 
            } else {
                setError("Title unavailable");
            }
        }
    }

    function editItem() {
        if (!title.trim() || !description.trim()) {
            setError("Empty field");
        } else {
            if(used(title) && title !== key) {
                setError("Title unavailable");
            } else {
                setData(state.data.map((item) => {
                    if (item.title === key) {
                      const updatedItem = {
                        ...item,
                        title: title,
                        state: selectedValue,
                        description: description
                      };
               
                      return updatedItem;
                    }
               
                    return item;
                }));
                closeModal();
            }
        }
    }

    //We straight up filter out the item with same key(title) as item we want deleted
    //and store this filtred array as our new render array.
    function deleteItem() {
        setData(state.data.filter(item => item.title !== key));
        closeModal();
    }

    function handleRadio(event) {
        setSelectedValue(parseInt(event.target.value))
    }

    function openEdit(info) {
        setModalState(false);
        openModal();
        setTitle(info.title);
        setDescription(info.description);
        setKey(info.title);
        setSelectedValue(info.state);
    }

    function used(key) {
        let found = false;
        state.data.forEach((item) => {
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
    
    function closeModal(){
        setError("");
        setTitle("");
        setDescription("");
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
                        <textarea type="text" placeholder="Description" value={description} onChange={event => setDescription(event.target.value)} />
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