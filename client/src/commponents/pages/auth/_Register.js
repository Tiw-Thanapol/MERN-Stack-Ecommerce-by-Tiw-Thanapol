// rafce
import React, { useState } from "react";
//functions
import { register } from "../../functions/auth";


const Register = () => {
    const [value, setValue] = useState({
        username:"",  
        password:"",
        password1:"",
    });
    const handleChange = (e) =>{
        setValue({
            ...value,
            [e.target.name]: e.target.value,

        });
    };

   // console.log(value)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value)
        if(value.password !== value.password1) {
            alert("Password not match");
        } else {
            //code
            register (value)
            .then((res) => {
                console.log(res.data);
                alert(res.data)
            })
            .catch((err) => {
                console.log(err.response.data);
                alert(err.response.data)
            }); 
        } 
    }

  return (
    <div>
        <form onSubmit={handleSubmit} > 
            <label>Username</label><br />
            <input type="text" name="username" onChange={handleChange} />
            
            <br />
            <label>Password</label><br />
            <input type="text" name="password" onChange={handleChange} />
            <br />
            <label>Confirm Password</label><br />
            <input type="text" name="password1" onChange={handleChange} />
            <br />
            <button disabled={value.password.length < 6}>Submit</button>
            
        </form>
    </div>
  )
}

export default Register