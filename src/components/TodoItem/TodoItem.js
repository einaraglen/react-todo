import "./TodoItem.style.css";
import proceed from "../../images/proceed.svg";
import edit from "../../images/edit.svg";

const ToodoItem = ({ info, handler }) => {

    const states = ["Todo", "Doing", "Done"];

    return (
        <div className="item">
            <p className="title">{info.title}</p>
            <p className="status">{states[info.state]}</p>
            <p className="description">{info.description}</p>
            <div className="tools">
                <div className="holder">
                    {
                        /* Cannot proceede if task is done, there for retrun null */
                        (info.state !== 2) ? 
                        <div className="proceed-button" onClick={() => handler("proceed", info)}>
                            <p>{(info.state === 0) ? "Start" : "Finish"}</p>
                            <img src={proceed} alt="proceed icom" />
                        </div> : null
                    }
                    <img 
                        className="edit-button" 
                        src={edit} alt="edit icon" 
                        onClick={() => handler("edit", info)} 
                    />
                </div>
            </div>
        </div>
    )
}

export default ToodoItem;