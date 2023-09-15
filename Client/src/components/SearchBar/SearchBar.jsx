import { useState } from "react";
import { searchContainer } from "./searchBar.styles";

export default function SearchBar({onSearch}) {
   
   let [id, setId] = useState("")

   const handleChange = (event) => {
      setId(event.target.value)

   }

   return (
      <searchContainer>
         <input type='search' onChange={handleChange} value={id}/>
         <button onClick={() => onSearch(id)}>Agregar</button>
      </searchContainer>
   );
}
