import { collection, getDocs } from 'firebase/firestore';
import './Charts.scss';
import React from 'react'
import { firestore } from '../../../config/firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import Graph from '../../../components/Graph';
import Piecharts from '../../../components/Piecharts';

export default function Charts() {
    const [state, setState] = useState(0)
    const [courses, setCourses] = useState(0)
    const [attendence, setAttendence] = useState(0)

    const getStudents = async () => {
        try {
            const collectionRef = collection(firestore, "studentsData")
            const snapshot = await getDocs(collectionRef)
            const documentss = snapshot.size
            setState(documentss)
        } catch (error) {
            console.error(error)
        }
    }
    const getCourses = async () => {
        try {
            const collectionRef = collection(firestore, "courses")
            const snapshot = await getDocs(collectionRef)
            const documentss = snapshot.size
            setCourses(documentss)
        } catch (error) {
            console.error(error)
        }
    }
    const getAttendence = async () => {
        try {
            const collectionRef = collection(firestore, "attendence")
            const snapshot = await getDocs(collectionRef)
            const documentss = snapshot.size
            setAttendence(documentss)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getStudents();
        getCourses();
        getAttendence();
    }, [])

    return (
        <main>
            <div className="container">
                <div className="row d-flex justify-content-around">
                    <div className="col-8 col-md-5 col-lg-3 border border-0 rounded-5 border-css" style={{
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        height: '150px',
                        overflow: 'hidden'
                    }}>
                        <h5 className='text-center my-3'><strong>Total Students</strong></h5>
                        <h1 className="d-flex justify-content-around align-items-center fw-bold mt-4">
                            {state}
                        </h1>
                    </div>
                    <div className="col-8 col-md-5 col-lg-3 border border-0 rounded-5 border-css my-4 my-md-0" style={{
                        height: '150px',
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        overflow: 'hidden'
                    }}>
                        <h5 className='text-center my-3'><strong>Total Courses</strong></h5>
                        <h1 className="d-flex justify-content-center align-items-center fw-bold mt-4">
                            {courses}
                        </h1>
                    </div>
                    <div className="col-8 col-md-5 col-lg-3 border border-0 rounded-5 border-css mt-0 mt-md-4 mt-lg-0" style={{
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        height: '150px',
                        overflow: 'hidden'
                    }}>
                        <h5 className='text-center my-3'><strong>Total Students Attendence</strong></h5>
                        <h1 className="d-flex justify-content-center align-items-center fw-bold mt-4">
                            {attendence}
                        </h1>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <Graph />
                        <Piecharts />
                    </div>
                </div>
            </div>
        </main>
    )
}
