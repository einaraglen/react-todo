import "./TodoItem.style.css";
import proceed from "../../images/proceed.svg";
import edit from "../../images/edit.svg";
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Component to display the informaion of a Todo-Item
 * @param {Object} props  
 * @returns 
 */
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
                            (info.state === 2) ? null :
                            <Tooltip title="Proceed" placement="bottom">
                                <div className="proceed-button" onClick={() => handler("proceed", info)}>
                                    <p>{(info.state === 0) ? "Start" : "Finish"}</p>
                                    <img src={proceed} alt="proceed icom" />
                                </div>
                            </Tooltip>
                        }
                        <Tooltip title="Edit" placement="bottom">
                            <div className="edit-container" onClick={() => handler("edit", info)}>
                                <img 
                                    className="edit-button" 
                                    src={edit} alt="edit icon" 
                                />
                            </div>
                        </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default ToodoItem;