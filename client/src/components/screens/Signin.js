import React from 'react'
import {Link} from 'react-router-dom'
import { Card,Button,Form } from 'react-bootstrap'

const Signin =()=>{
    return(
        <>
        <br/>
        <h2 style={{textAlign: 'center' }}>Take you forward</h2>
        <div className="mycard">
            <div className="card auth-card input-field">
                
        {/* <Card  style={{ width: '18rem' }}> */}
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        
        <Button variant="primary" type="submit">
            Signin
        </Button>
        </Form>
        {/* </Card> */}
        </div>
     </div>
     </>
    )
}


export default Signin;