import React from 'react'
import { useState } from 'react';
import './Students.scss'
import { Button, Divider, Form, Input, Modal, Space, Tooltip, Typography, message } from 'antd';
import { collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase'
import { useEffect } from 'react';
import { DeleteOutlined } from '@mui/icons-material';
const { Title } = Typography;

export default function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (value) => {
    const { name, email, number, roll } = value
    const todo = {
      name: name,
      email: email,
      number: parseInt(number),
      roll: parseInt(roll),
      id: Math.random().toString(36).slice(2),
    }
    setIsLoading(true)
    try {
      await setDoc(doc(firestore, "studentsData", todo.id), todo);
      message.success("A new Student added successfully")
      setDocuments(docs => [...docs, todo])
    } catch (e) {
      message.error("Error adding document: ", e);
    }
    setIsLoading(false)
    setIsModalOpen(false)
  }

  // delete data
  const handleDelete = async (todo) => {
    try {
      await deleteDoc(doc(firestore, "studentsData", todo.id));
      let documentsAfterDelete = documents.filter(doc => doc.id !== todo.id)
      setDocuments(documentsAfterDelete)
      message.success("Student data deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting todo")
    }
  }


  const getTodos = async () => {

    const q = query(collection(firestore, "studentsData"))

    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setDocuments(array)
  }

  useEffect(() => {
    getTodos()
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <main>
        <div className='container'>
          <div className="row">
            <div className="col d-flex justify-content-between">
              <h4>Students Portal</h4>
              <button onClick={showModal} className='btn btn-primary btn-sm text-white'>Add Student</button>
              <Modal open={isModalOpen} footer={null} style={{ zIndex: 99 }}>
                <Title level={2} className="text-center my-1" >Add Student Data</Title>
                <Divider />
                <Form layout='vertical' onFinish={handleSubmit}>
                  <Form.Item label="Name:" name='name'>
                    <Input type='text' placeholder='Student Name' />
                  </Form.Item>
                  <Form.Item label="Email:" name='email'>
                    <Input type='email' placeholder='Student Email' />
                  </Form.Item>
                  <Form.Item label="Roll Number:" name='roll'>
                    <Input type='number' placeholder='Student Roll Number' />
                  </Form.Item>
                  <Form.Item label="Mobile Number:" name='number'>
                    <Input type='number' placeholder='Student Mobile Number' />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' className='w-100' loading={isLoading} >Add List</Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
          <hr />
          <div className="row my-5">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Roll No #</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((todo, i) => {
                      return (
                        <tr key={i}>
                          <th>{todo.roll}</th>
                          <td>{todo.name}</td>
                          <td>{todo.email}</td>
                          <td>{todo.number}</td>
                          <td>
                            <Space>
                              <Tooltip title="Delete" color='red'><Button size='large' danger icon={<DeleteOutlined />} onClick={() => { handleDelete(todo) }} /></Tooltip>
                            </Space>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}