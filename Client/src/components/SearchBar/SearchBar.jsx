import { useState } from "react";

import style from './searchBar.module.css'


export default function SearchBar({onSearch, random}) {
   
   let [id, setId] = useState("")

   const handleChange = (event) => {
      setId(event.target.value)

   }

   return (
      <div className={style.searchbar}>
         <input className={style.searchinput} type='search' onChange={handleChange} value={id}/>
         <button onClick={() => onSearch(id)}>Agregar</button>
         
      </div>
   );
}
