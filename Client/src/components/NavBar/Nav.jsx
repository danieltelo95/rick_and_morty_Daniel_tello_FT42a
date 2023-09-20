import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import style from './navBar.module.css'

const Nav = ({onSearch, random}) => {

        let location = useLocation();
        let condicion = location.pathname !== '/';
  
    return(
        <div>
            {condicion && (
                <nav>
                    <div>
                        <SearchBar onSearch={onSearch}/>
                        <div className={style.optionsContainer} >
                            <button onClick={random}> Agregar Random </button>
                            <div className={style.option }><Link to='/about'>ABOUT</Link></div>
                            <div className={style.option }><Link to='/home'> HOME</Link></div>
                            <div className={style.option }><Link to='/favorites'>FAVORITES</Link></div>
                            </div>
                    </div>
                </nav>
            )}
        </div>
    )

}

export default Nav;