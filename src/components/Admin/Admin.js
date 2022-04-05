import React, {useState, useEffect} from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import User from './User/User';

function Admin() {

    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    async function getUsers(){
        //Fetch user list from DB authed for admins
        let creds = {};

        let result = await fetch("http://localhost:8000/api/users", {

            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(creds),
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN')
            }

        })
        result = await result.json();
        console.log(result);
        setResults(result);
    }

    useEffect(() => {

        if(localStorage.getItem('user-info') == null){
            navigate('/login');
        }

        if(JSON.parse(localStorage.getItem('user-info')).user_type != 'admin'){
            navigate('/login');
        }

        getUsers();

    }, []);

    

    return(
        <>
            <Navbar.Brand>Users</Navbar.Brand>
            <Container>
                {results.map((result) => {
                return( 
                    <User key={result.id} obj={result}>

                    </User>
                );
                })
                
                }
            </Container>
        </>
    )

}

export default Admin