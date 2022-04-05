import React, {useState, useEffect} from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        if(localStorage.getItem('user-info')){
            navigate('/weather');
        }

        csrfGet();

    }, []);

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

    async function csrfGet(){
        //Fetch initial XSRF TOKEN and store
        let result = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                "X-Requested-With": "XMLHttpRequest"
            }

        }).then(() => {
            const csrfToken = getCookie('XSRF-TOKEN');
            localStorage.setItem("XSRF-TOKEN", csrfToken);
        });
    }


    async function signUp(){
        //Login user and re establish XSRF TOKEN

        let creds = {email, password};
        
        let result = await fetch("http://localhost:8000/api/login", {
        
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
        result = await result.json();
        if(result.error != undefined){
            setErrors(result.error);
            return;
        }

        
        const csrfToken = getCookie('XSRF-TOKEN');
        localStorage.setItem("XSRF-TOKEN", csrfToken);

        

        localStorage.setItem("user-info", JSON.stringify(result));
        if(JSON.parse(localStorage.getItem('user-info')).user_type == 'admin'){
            navigate('/admin');
        } else {
            navigate('/weather');
        }
        
    }

    return(
        <>
            <Navbar.Brand>Sign in</Navbar.Brand>
            <input placeholder='email' className='input-basic' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input placeholder='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='input-basic'/>
            <button onClick={signUp} className='button-basic'>Sign In</button>

            <p className='register-question'>Don't have an account? <Link to='/register'>Register Here.</Link></p>

            <p className='register-question'>{errors}</p>

        </>
    )

}

export default Login