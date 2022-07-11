import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

// import { stateToHTML } from "draft-js-export-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
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

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        tempObj["Name"] = taskName
        tempObj["Description"] = draftToHtml(convertToRaw(description.getCurrentContent()))
        updateTask(tempObj)
    }

    useEffect(() => {
        setTaskName(taskObj.Name)
        setDescription(EditorState.createWithContent(
            ContentState.createFromBlockArray(
                htmlToDraft(taskObj.Description)
            )
        ))
    }, [])

    // const handleChangeEditor = (editorState) => {
    //     const contentState = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    //     console.log(contentState)
    // }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" maxLength={20} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    {/* <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea> */}
                </div>
                <Editor
                    defaultEditorState={description}
                    onEditorStateChange={editorState => {
                        setDescription(editorState);
                        // handleChangeEditor(editorState);
                    }}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;