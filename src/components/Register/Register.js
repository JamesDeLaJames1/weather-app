import React, {useState, useEffect} from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        if(localStorage.getItem('user-info')){
            navigate('/weather');
        }

    });

    function getCookie(name) {
        if (!document.cookie) {
          return null;
        }
      
        const xsrfCookies = document.cookie.split(';')
          .map(c => c.trim())
          .filter(c => c.startsWith(name + '='));
      
        if (xsrfCookies.length === 0) {
          return null;
        }
        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
      }

    async function register(){
        //Register user from input data handle errors
        let creds = {name, email, location, password};

        let result = await fetch("http://localhost:8000/api/register", {
        
            method: 'post',
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

        if(result.errors != undefined){
            setErrors(result.message);
            return;
        }

        const csrfToken = getCookie('XSRF-TOKEN');
        localStorage.setItem("XSRF-TOKEN", csrfToken);
        
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate('/weather');
    }

    return(
        <>
            <Navbar.Brand>Sign Up</Navbar.Brand>
            <input placeholder='Name' className='input-basic' value={name} onChange={(e)=>setName(e.target.value)} />
            <input placeholder='email' className='input-basic' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input placeholder='Town/City' className='input-basic' value={location} onChange={(e)=>setLocation(e.target.value)} />
            <input placeholder='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='input-basic'/>
            <button onClick={register} className='button-basic'>Sign Up</button>

            <p className='register-question'>Already have an account? <Link to='/login'>Sign In Here.</Link></p>

            <p className='register-question'>{errors}</p>
        </>
    )

}

export default Register