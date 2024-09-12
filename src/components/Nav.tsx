import React, {useState} from 'react';
import useGetWindowSize from "../hooks/useGetWindowSize";
import NavMenuMobile from "./NavMenuMobile";
import NavMenu from "./NavMenu";
import {Link} from "react-router-dom";

import Logo from '../static/images/Logo.png'

interface props {
  showBtn: string | null
}

function Nav({ showBtn = null } : props) {
  const [windowWidth, windowHeight] = useGetWindowSize()
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const isMobile = windowWidth < 1200

    const navMenu = isMobile ?
      <NavMenuMobile isLoggedIn={isLoggedIn} showBtn={showBtn}/>
      : <NavMenu isLoggedIn={isLoggedIn} showBtn={showBtn}/>
    return (
        <div className='navigation'>
            <div className="logo-container" >
                <Link to={localStorage.getItem('token') ? '/dashboard' : '/'}>
                  <img src={Logo} alt="Райхан" style={isMobile ? {width: 120, marginTop: 5} : {width: 150}}/>
                  {/*<h3 style={{margin: 0}}>Райхан</h3>*/}
                </Link>
            </div>
            {navMenu}
        </div>
    );
}

export default Nav;