import React from 'react'

function User(props) {
  

    return(
        <div className='weather-tile'>
            <div className='container'>
                
                <div className='row'>
                    <div className='col-sm-3'>
                        {props.obj.name}    
                    </div>
                    <div className='col-sm-3'>
                        {props.obj.email}    
                    </div>
                    <div className='col-sm-3'>
                        
                        {props.obj.location}        
                    </div>

                    <div className='col-sm-3'>
                        {props.obj.user_type}        
                    </div>
                </div>
                
            </div>
            
        </div>
    )

}

export default User