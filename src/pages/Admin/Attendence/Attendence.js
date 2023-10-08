import React from 'react'
import { useState } from 'react';
import './Attendence.scss'
import { Button, DatePicker, Divider, Form, Input, Modal, Select, Typography, message } from 'antd';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase'
import { useEffect } from 'react';
import dayjs from 'dayjs';
const { Title } = Typography;


export default function Attendence() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [state, setState] = useState({ date: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [status, SetStatus] = useState("");
  const [filter, setFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [section, setSection] = useState("A");
  const [course, setCourse] = useState("JavaScript");
  const [allDocuments, setAllDocuments] = useState([]);


  const handleDate = (_, date) => setState(s => ({ ...s, date }))

  const handleSubmit = async (value) => {
    const { date } = state
    const { name, roll, select, section, course } = value

    if (!name || !roll || !date || !section) return message.error("Please Enter Correct Details")
    console.log(value)
    const todo = {
      name: name,
      select: select,
      section: section,
      course: course,
      date: date,
      roll: parseInt(roll),
      id: Math.random().toString(36).slice(2),
    }
    setIsLoading(true)
    try {
      await setDoc(doc(firestore, "attendence", todo.id), todo);
      message.success("Attendence added successfully")
      setDocuments(docs => [...docs, todo])
    } catch (e) {
      message.error("Error adding document: ", e);
    }
    setIsLoading(false)
    setIsModalOpen(false)
  }

  const getTodos = async () => {

    const q = query(collection(firestore, "attendence"))

    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setDocuments(array)
    setAllDocuments(array)
  }

  useEffect(() => {
    if (status === '' && sectionFilter === '' && courseFilter === '') {
      setDocuments(allDocuments);
    } else {
      const filteredDocuments = allDocuments.filter(todo => {
        return (
          (status === '' || todo.select === status) &&
          (sectionFilter === '' || todo.section === sectionFilter) &&
          (courseFilter === '' || todo.course === courseFilter)
        );
      });
      setDocuments(filteredDocuments);
    }
  }, [allDocuments, status, sectionFilter, courseFilter]);


  useEffect(() => {
    getTodos()
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <main>
        <div className='container'>
          <div className="row">
            <div className="col d-flex justify-content-between">
              <h4>Attendence Portal</h4>
              <button onClick={showModal} className='btn btn-info btn-sm text-light'>Add Attendence</button>
              <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleCancel} footer={null} style={{ zIndex: 99 }}>
                <Title level={2} className="text-center my-1" >Add Student Data</Title>
                <Divider />
                <Form layout='vertical' onFinish={handleSubmit}>
                  <Form.Item name='name'>
                    <Input type='text' placeholder='Student Name' />
                  </Form.Item>
                  <Form.Item name='roll'>
                    <Input type='number' placeholder='Student Roll Number' />
                  </Form.Item>
                  <Form.Item name='select'>
                    <Select placeholder="Select status" onChange={status => SetStatus(status)}>
                      {["present", "absent", "leave"].map((status, i) => {
                        return <Select.Option key={i} value={status}>{status}</Select.Option>
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item name='section'>
                    <Select placeholder="Select Section" onChange={section => setSection(section)}>
                      {["A", "B", "C"].map((section, i) => {
                        return <Select.Option key={i} value={section}>{section}</Select.Option>
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item name='course'>
                    <Select placeholder="Select Course Name" onChange={course => setCourse(course)}>
                      {["JavaScript", "Java", "Python", "C", 'C++', "React"].map((course, i) => {
                        return <Select.Option key={i} value={course}>{course}</Select.Option>
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item name='date'>
                    <DatePicker className='w-100' onChange={handleDate} />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' className='w-100' loading={isLoading} >Add Attendence</Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
          <div className="row my-5">
            <div className="col">
              <Form.Item label='Filter by Status'>
                <Select
                  placeholder="Select status"
                  onChange={status => SetStatus(status)}
                  value={status}
                >
                  {["", "present", "absent", "leave"].map((filter, i) => {
                    return <Select.Option key={i} value={filter}>{filter || "All"}</Select.Option>
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item label='Filter by Section'>
                <Select
                  placeholder="Select section"
                  onChange={section => setSectionFilter(section)}
                  value={sectionFilter}
                >
                  {["", "A", "B", "C"].map((section, i) => {
                    return <Select.Option key={i} value={section}>{section || "All"}</Select.Option>
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item label='Filter by Course'>
                <Select
                  placeholder="Select course"
                  onChange={course => setCourseFilter(course)}
                  value={courseFilter}
                >
                  {["", "JavaScript", "Java", "Python", "C", 'C++', "React"].map((course, i) => {
                    return <Select.Option key={i} value={course}>{course || "All"}</Select.Option>
                  })}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row my-5">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Roll No #</th>
                      <th>Section</th>
                      <th>Course Name</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((todo, i) => {
                      return (
                        <tr key={i}>
                          <th>{todo.name}</th>
                          <td>{todo.roll}</td>
                          <td>{todo.section}</td>
                          <td>{todo.course}</td>
                          <td>{dayjs(todo.date).format("YYYY-MM-DD")}</td>
                          <td>{todo.select}</td>
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