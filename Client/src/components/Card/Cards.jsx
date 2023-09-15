import Card from './Card';
import style from './Cards.module.css'

export default function Cards({characters, onClose}) {

   return (
   
   <div className={style.container} >
      {
         characters.map(({id, name, status, species, origin, gender, image}) =>{
            return(
               <Card
               key = {id}
               id = {id}
               name = {name}
               status = {status}
               species = {species}
               origin= {origin.name}
               gender={gender}
               image={image}
               onClose={onClose}
               />
               )
            })
         }
   </div>
   );
}
