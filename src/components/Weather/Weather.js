import React, {useState, useEffect} from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Tile from './Tile/Tile';

function Weather() {

    const navigate = useNavigate();
    const [search, setSearch] = useState(JSON.parse(localStorage.getItem('user-info')).location);
    const [results, setResults] = useState([]);

    async function doSearch(){
        //Fetch search results for query from DB authed for users
        let creds = {search};

        let result = await fetch("http://localhost:8000/api/search", {

            method: 'POST',
            body: JSON.stringify(creds),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN')
            }

        })
        result = await result.json();
        console.log(result);
        setResults(result.daily);
    }

    useEffect(() => {

        if(localStorage.getItem('user-info') == null){
            navigate('/login');
        }

    });
    return(
        <>
            <Navbar.Brand>Search</Navbar.Brand>
            <input placeholder='Search' className='input-basic' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <button onClick={doSearch} className='button-basic'>Search</button>
            <Container>
                {results.map((result) => {
                   return( 
                   <Tile key={result.dt} obj={result}>

                   </Tile>
                   );
                })
                
                }
            </Container>
        </>
    )

}

export default Weather