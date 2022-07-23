import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';


const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "taskName") {
            setTaskName(value)
        } else {
            setDescription(value)
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["Name"] = taskName
        taskObj["Description"] = draftToHtml(convertToRaw(description.getCurrentContent()))
        save(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" maxLength={20}/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                </div>
                <Editor
                    defaultEditorState={description}
                    onEditorStateChange={editorState => {
                        setDescription(editorState);
                    }}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;