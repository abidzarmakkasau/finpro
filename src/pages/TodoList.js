import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import Card from '../components/Card'
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import {
    MDBFooter,
    MDBIcon
} from 'mdb-react-ui-kit';
import Logo from '../images/note.png'

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        let arr = localStorage.getItem("taskList")

        if (arr) {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }

    return (
        <>

            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt="Logo"
                            src={Logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>

                    <Nav className="justify-content">
                        <Button style={{ marginRight: "10px" }} variant="light" onClick={() => setModal(true)} >Create Task</Button>{' '}
                    </Nav>
                </Container>
            </Navbar>

            <div className="task-container">
                {taskList && taskList.map((obj, index) => <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />

            <MDBFooter className='bg-dark text-center text-white'>
                <div className='container p-2'>
                    <section className='mx-auto'>
                        <a
                            className='btn btn-primary btn-floating m-1'
                            style={{ backgroundColor: '#3b5998' }}
                            href="https://www.facebook.com/andiabidzarmakkasau/"
                            rel="noreferrer"
                            target="_blank"
                            role='button'
                        >
                            <MDBIcon fab icon='facebook-f' />
                        </a>

                        <a
                            className='btn btn-primary btn-floating m-1'
                            style={{ backgroundColor: '#0082ca' }}
                            href="https://www.linkedin.com/in/abidzarmakkasau"
                            rel="noreferrer"
                            target="_blank"
                            role='button'
                        >
                            <MDBIcon fab icon='linkedin-in' />
                        </a>

                        <a
                            className='btn btn-primary btn-floating m-1'
                            style={{ backgroundColor: '#333333' }}
                            href="https://github.com/abidzarmakkasau?tab=repositories"
                            rel="noreferrer"
                            target="_blank"
                            role='button'
                        >
                            <MDBIcon fab icon='github' />
                        </a>
                    </section>
                </div>

                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    Copyright © 2022 Bebas Project Inc. All rights reserved.
                </div>
            </MDBFooter>

        </>
    );
};

export default TodoList;