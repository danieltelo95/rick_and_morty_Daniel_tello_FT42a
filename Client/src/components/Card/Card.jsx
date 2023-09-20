import { NavLink } from "react-router-dom";
import { addFav, removeFav } from '../../redux/actions'
import { connect } from "react-redux";
import {useState, useEffect} from "react"
import style from "./card.module.css"


function Card( {id, name, species, gender, image, onClose, addFav, removeFav, myFavorites}) {

   const [isFav, setIsFav] = useState(false)
   const [closeBtn, setCloseBtn] = useState(true);

   useEffect(() => {
      if (!onClose) {
        setCloseBtn(false);
      }
    }, []);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         removeFav(id);
      } else{
         setIsFav(true)
         addFav({id, name, species, gender, image})
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (

      <div className ={style.cardContainer}>

      <div className={style.imageContainer} >
         <button onClick={handleFavorite}>{isFav? '❤️' : '🤍'}</button>
         <img className={style.characterImage} src={image} alt='' />
            <NavLink to={`/detail/${id}`}>
               <h2 className={style.name} >{name}</h2>
            </NavLink>                 
         
         <div className={style.closeButton}>
          {closeBtn && (
            <button
              onClick={() => {
                 onClose(id);
                 
               }}
               >
              X
            </button>
          )}
         </div>
      </div>
      <div className ={style.atributes}>
         <h2>{species} </h2>
         <h2>{gender} </h2>
      </div>       
      </div>
         
   );
}

const mapStateToProps = (state) => {
   return{
      myFavorites: state.myFavorites
   }
}

const mapDispatchToProps = (dispatch) => {
   return{
      addFav: (character) => {dispatch(addFav(character))},
      removeFav: (id) => {dispatch(removeFav(id))}
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(Card)


