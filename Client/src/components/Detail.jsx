import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const Detail = () => {
const [character, setCharacter] = useState({});
const {id} = useParams();

useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
       if (data.name) {
          setCharacter(data);
       } else {
          alert('No hay personajes con ese ID');
       }
    });
    return setCharacter({})
 }, []);

    return(
        <div>
             <div>
                <h3></h3>
                <img src={character.image} alt=''/>
            </div>
            <div>
                <h3>Nombre:</h3>
                <p>{character.name}</p>
            </div>
            <div>
                <h3>Species:</h3>
                <p>{character.species}</p>
            </div>
            <div>
                <h3>Gender:</h3>
                <p>{character.gender}</p>
            </div>
            <div>
                <h3>Status:</h3>
                <p>{character.status}</p>
            </div>
            <div>
                <h3>Origin:</h3>
                <p>{character.origin?.name}</p>
            </div>
            <div>
                <h3>Location</h3> 
                <p>{character.Location?.name}</p>
            </div>
        </div>
    )

}

export default Detail