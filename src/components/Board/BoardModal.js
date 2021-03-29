import React from "react";
import Modal from 'react-modal';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Context } from "../../context/Store";
import "./Board.style.css";

Modal.setAppElement("#root");

const BoardModal = ({ modalIsOpen , setIsOpen, modalState, setModalState, currentItem }) => {

    const [state, dispatch] = React.useContext(Context);

    //saves the key when edit is open so that we can update title which acts as key
    const [key, setKey] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [error, setError] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState(0);

    React.useEffect(() => {
        setTitle(currentItem.title);
        setDescription(currentItem.description);
        setKey(currentItem.title);
        setSelectedValue(currentItem.state);
    }, [currentItem]);

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

    function addItem() {
        if (!title.trim() || !description.trim()) {
            setError("Empty field");
        } else {
            if (!used(title)) {
                dispatch({type: "SET_DATA", payload: state.data.concat({
                    title: title,
                    state: 0,
                    description: description
                })});
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
                dispatch({type: "SET_DATA", payload: state.data.map((item) => {
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
                })});
                closeModal();
            }
        }
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

    //We straight up filter out the item with same key(title) as item we want deleted
    //and store this filtred array as our new render array.
    function deleteItem() {
        dispatch({type: "SET_DATA", payload: state.data.filter(item => item.title !== key)});
        closeModal();
    }

    function handleRadio(event) {
        setSelectedValue(parseInt(event.target.value))
    }

    function closeModal(){
        setError("");
        setTitle("");
        setDescription("");
        setIsOpen(false);
        setModalState(true);
    }

    return (
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
    )
}

export default BoardModal;