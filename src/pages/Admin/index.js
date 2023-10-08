import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Charts from './Charts/Charts'
import Students from './Students/Students'
import Courses from './Courses/Courses'
import SidebarMenu from '../../components/SidebarMenu'
import Attendence from './Attendence/Attendence'

export default function Index() {
    return (
        <>
            <main>
                <Routes>
                    <Route path='/' element={<SidebarMenu />}>
                        <Route index element={<Charts />} />
                        <Route path='/charts' element={<Charts />} />
                        <Route path='students-data' element={<Students />} />
                        <Route path='courses' element={<Courses />} />
                        <Route path='attendence' element={<Attendence />} />
                    </Route>
                </Routes>
            </main>
        </>
    )
}
