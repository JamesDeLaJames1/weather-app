import React from 'react'
import {Container, Navbar} from 'react-bootstrap'
import {Routes, Route} from 'react-router-dom'
import Login from '../login/Login'
import Register from '../Register/Register'
import Weather from '../Weather/Weather'
import Admin from '../Admin/Admin'

function Main() {

    return(
        <>
            <Container>

                <Navbar bg='light' variant='light' className='navbar-wrapper navbar-main'>
                    <Container>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/weather' element={<Weather />} />
                        <Route path='/admin' element={<Admin />} />
                    </Routes>
                        

                    </Container>

                </Navbar>

            </Container>
        </>
    )

}

export default Main