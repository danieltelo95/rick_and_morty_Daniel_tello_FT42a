import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cards from './components/Cards';
import Nav from './components/Nav';
import About from './components/About';
import Detail from './components/Detail';
import ErrorPage from './components/ErrorPage';
import Form from './components/Form';
import Favorites from './components/Favorites';


function App() {

   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   const EMAIL = 'daniel@gmail.com';
   const PASSWORD = '123asd';

   function loginHandler(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
   }
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   let [characters, setCharacters] = useState([]);

   const onSearch = (id) => {
      axios(`https://rickandmortyapi.com/api/character/${id}`)
         .then(({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               alert('¡No hay personajes con este ID!');
            }
         })
         .catch(error => {
            if (error.response && error.response.status === 404) {
               alert('¡No hay personajes con este ID!');
            } else {
               console.error('An error occurred:', error);
            }
         });
   }

   const onClose = (id) => {
      let deleted = characters.filter(character => character.id !== Number(id))

      setCharacters(deleted);
   }

   return (
      <div className='App'>
         
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

   // const example = {
   //    id: 1,
   //    name: 'Rick Sanchez',
   //    status: 'Alive',
   //    species: 'Human',
   //    gender: 'Male',
   //    origin: {
   //       name: 'Earth (C-137)',
   //       url: 'https://rickandmortyapi.com/api/location/1',
   //    },
   //    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
   // };
