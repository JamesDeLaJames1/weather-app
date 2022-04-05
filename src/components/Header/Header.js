import React from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
function Header() {

    const navigate = useNavigate();

    async function signOut(){
        //Sign out user
        let creds = {};
        
        let result = await fetch("http://localhost:8000/api/logout", {
        
            method: 'post',
            body: JSON.stringify(creds),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN'),
                "X-Requested-With": "XMLHttpRequest"
            }

        })

        localStorage.clear();
        navigate('/login');
    }

    return(
        <>
        <Container>
            <Navbar bg="light" variant="light" className="navbar-wrapper">
            <Container>
                <Navbar.Brand>Weatherly</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    {localStorage.getItem('user-info') ? 
                    <>
                     <button onClick={signOut} className='button-basic button-none'>Sign Out</button>
                    </>:null}
                     
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </Container>
        </>
    )

}

export default Header