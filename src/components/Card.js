import React, { useState } from 'react';
import EditTask from '../modals/EditTask';


const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
        toggle();
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
            <div className="task-holder">
                <div className="card-header" style={{ backgroundColor: "white", borderRadius: "15px" }}>
                    <span>{taskObj.Name}</span>
                </div>
                <div className="overflow-auto" style={{ backgroundColor: "white", borderRadius: "10px" }} dangerouslySetInnerHTML={{ __html: taskObj.Description }}></div>

                <div style={{ position: "absolute", right: "200px", bottom: "30px" }}>
                    <i className="fas fa-edit fa-lg" style={{ color: colors[index % 5].primaryColor, cursor: "pointer", marginRight: "10px" }} onClick={() => setModal(true)}></i>
                    <i className="fas fa-trash-alt fa-lg" style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }} onClick={handleDelete}></i>
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};

export default Card;