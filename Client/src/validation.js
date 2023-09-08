export function validate(userData) {

    const errors = {
    email:'',
    password: ''
}

    if(!userData.email){
        errors.email = 'Este campo no puede quedar en blanco'
    }
    if(!/\S+@\S+\.\S+/.test(userData.email)) {
        errors.email= 'El usuario tiene que ser un email'
    }
    if(userData.email.length > 35){
        errors.email= 'El usuario no puede tener más de 35 caracteres'
    }
    if(!/^(?=.*[0-9]).{6,10}$/.test(userData.password)){
        errors.password= 'La password debe contener al menos un número y entre 6 y 10 caracteres'
    }
    return errors
}
