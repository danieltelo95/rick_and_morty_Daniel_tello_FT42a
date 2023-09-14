import { useState } from "react"
import { validate } from "../../validation"

const Form = ({loginHandler}) => {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    
    const [errors, setErrors] = useState({
        email:'',
        password: ''
    })

    const handleOnChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })        
    
    setErrors(
        validate({
            ...userData,
            [event.target.name]: event.target.value
        })
    )
    }

    const submitHandle = (event) => {
        event.preventDefault();
        loginHandler(userData)
    }

    return (
        <form onSubmit= {submitHandle}>
            <h1>Welcome to the Rick And Morty App</h1>

            <label htmlFor="email" > Usuario: </label>
            <input  name="email" type="email" placeholder="Ingrese su email" value={userData.email}
             onChange={handleOnChange}>
            </input>
            {errors.email && <p>{errors.email}</p>}
            <hr/>
            <label htmlFor="password"> Contraseña: </label>
            <input  name="password" type="password" 
                    placeholder="Ingrese su contraseña" 
                    value={userData.password}
                    onChange={handleOnChange}>
            </input>
            {errors.password && <p>{errors.password}</p>}
            <hr/>
            <button>Submit</button>

        </form>
    )

}

export default Form