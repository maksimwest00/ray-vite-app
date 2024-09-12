import {FaHamburger} from 'react-icons/fa'
import {Link} from "react-router-dom";
import {useState} from "react";
import SideBar from "./SideBar";
import CartWidget from "./CartWidget";

interface props {
  isLoggedIn: boolean,
  showBtn: string | null
}

function NavMenuMobile({isLoggedIn, showBtn}: props) {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div>
      {showSideBar && <SideBar setShowSideBar={setShowSideBar}/>}
      {
        !isLoggedIn &&
        <>
          {
            showBtn === 'login' &&
            <Link to='/login'>
              <button className='secondary-button'>Войти</button>
            </Link>
          }

          {
            showBtn === 'signup' &&
            <Link to='/signup'>
              <button className='secondary-button'>Зарегистрироваться</button>
            </Link>
          }
        </>
      }
      {
        isLoggedIn &&
        <div className='nav-mobile-controls'>
          <CartWidget />


          <button style={{display: 'flex', alignItems: 'center'}} className='icon-button square-corners nav-cart' onClick={() => setShowSideBar(true)}>
            <FaHamburger style={{marginRight: 5}}/> Меню
          </button>
        </div>
      }
    </div>
  );
}

export default NavMenuMobile;