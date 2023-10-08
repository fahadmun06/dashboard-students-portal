import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from './Admin'

export default function Index() {
    return (
        <>
            <Routes>
                <Route path='/*' element={<Admin />} />
            </Routes>
        </>
    )
}
