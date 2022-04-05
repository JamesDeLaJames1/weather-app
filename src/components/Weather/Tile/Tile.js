import React, {useState} from 'react'
import { Container } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

function Tile(props) {


    const [more, setMore] = useState(false);
    const navigate = useNavigate();
    const milliseconds = props.obj.dt * 1000
    const dateObject = new Date(milliseconds);

    function doMore(){
        setMore(prevMore => !prevMore);
    }
  
    const ShowMore = () => (
        <div className='row show-more-section' >
            <div className='col-sm-4'>
                <br />
                Humidity {Math.round(props.obj.humidity)}%
                <br />
                Clouds {Math.round(props.obj.clouds)}%  
            </div>
            <div className='col-sm-4'>
                Feels Like<br />
                Morning {Math.round(props.obj.feels_like.morn)}°C
                <br />
                Day {Math.round(props.obj.feels_like.day)}°C
                <br />
                Evening {Math.round(props.obj.feels_like.eve)}°C                 
            </div>
            <div className='col-sm-4'>
                <br />
                Wind Gusts {Math.round(props.obj.wind_gust)}Mph
                <br />
                Wind Speed {Math.round(props.obj.wind_speed)}Mph
            </div>

        </div>
      )

    return(
        <div className='weather-tile'>
            <div className='container'>
                
                <div className='row'>
         
                <div className='col-sm-4'>
                       <br/>
                        {dateObject.toLocaleString("en-GB", {weekday: "long"})}  
                        <br/>
                        { dateObject.toLocaleString("en-GB", {day: "numeric"})}
                    </div>
                    <div className='col-sm-4'>
                        Today {Math.round(props.obj.temp.day)}°C
                        <br />
                        Max {Math.round(props.obj.temp.max)}°C
                        <br />
                        Min {Math.round(props.obj.temp.min)}°C                 
                    </div>
                    <div className='col-sm-4'>
                        <br />
                        {props.obj.weather[0].description}        
                    </div>

                </div>

                {more ? <ShowMore /> : ''}

                <div className='row'>
                   <div className='col-sm-4'>

                    </div>
                    <div className='col-sm-4'>
                    <button onClick={doMore} className='button-basic'>{more ? 'Hide' : 'More'}</button>
                    </div>

                </div>
                
            </div>
            
        </div>
    )

}

export default Tile