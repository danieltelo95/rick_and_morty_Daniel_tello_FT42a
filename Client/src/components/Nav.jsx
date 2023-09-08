import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";

const Nav = ({onSearch}) => {

        let location = useLocation();
        let condicion = location.pathname !== '/';
  
    return(
        <div>
            {condicion && (
                <nav>
                    <div>
                        <SearchBar onSearch={onSearch}/>
                            <Link to='/about'>ABOUT</Link> 
                            <Link to='/home'> HOME</Link>
                            <Link to='/favorites'>FAVORITES</Link>
                    </div>
                </nav>
            )}
        </div>
    )

}

export default Nav;