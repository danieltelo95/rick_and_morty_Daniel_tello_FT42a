import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './assets/logo.png'

import Cards from './components/Card/Cards.jsx';
import Nav from './components/NavBar/Nav';
import Detail from './components/Detail/Detail';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import About from './components/About/About';

const URL = 'http://localhost:3001/rickandmorty/login/';

function App() {

   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   const EMAIL = 'daniel@gmail.com';
   const PASSWORD = '123asd';

   const loginHandler = async (userData) => {
      try {
         const { email, password } = userData;
         const { data } = await axios(URL + `?email=${email}&password=${password}`)         
         const { access } = data;

            setAccess(access);
            access && navigate('/home');

      } catch (error) {
         console.log(error.message);
      }
   }


   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   let [characters, setCharacters] = useState([]);

   const onSearch = async (id) => {
      try {
         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            }             
         } catch (error) {
            alert('¡No hay personajes con este ID!');
      }
   }

   const onClose = (id) => {
      let deleted = characters.filter(character => character.id !== Number(id))

      setCharacters(deleted);
   }

   return (
      <div className='App'>
         <img className='title' src={logo} alt='logo'/>
         
         <Nav onSearch={onSearch} />
         <Routes>
            <Route path='/' element={<Form loginHandler={loginHandler}/>}/>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/detail/:id' element={<Detail/>}/>
            <Route path='*' element={<ErrorPage/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
         </Routes>          
      </div>
   );
}


export default App
