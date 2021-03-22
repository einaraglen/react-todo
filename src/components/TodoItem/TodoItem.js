import "./TodoItem.style.css";
import proceed from "../../images/proceed.svg";
import edit from "../../images/edit.svg";

const ToodoItem = ({ info, key, handler }) => {

    const states = ["Todo", "Doing", "Done"];

    return (
        <div className="item">
            <p className="title">{info.title}</p>
            <p className="status">{states[info.state]}</p>
            <p className="description">{info.description}</p>
            <div className="tools">
                <div className="proceed-button">
                    <p>Proceed</p>
                    <img src={proceed} alt="proceed icom" />
                </div>
                <img className="edit-button" src={edit} alt="edit icon" />
            </div>
        </div>
    )
}

export default ToodoItem;