import React, {useState} from 'react';
import SideBar from "./SideBar";
import {Link} from "react-router-dom";
import CartWidget from "./CartWidget";
import {FaReceipt} from "react-icons/fa";
import {MdRestaurantMenu, MdWork, MdPlace} from "react-icons/md";
import {IoSettings} from "react-icons/io5";
import {RiContactsBookFill} from "react-icons/ri";
import {ImGlass} from "react-icons/im";

import {BsImage} from 'react-icons/bs'

interface props {
  isLoggedIn: boolean,
  showBtn: string | null
}

function NavMenu({isLoggedIn, showBtn}: props) {
  const [showSideBar, setShowSideBar] = useState(false);

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

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
        <div className='nav-controls'>
          <div className="nav-body">
            <ul>
              <li>
                <Link to='/dashboard'>
                  <div className='menu-item'>
                    <MdRestaurantMenu className='sidebar-menu-item-icon'/>
                    Меню
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/orders'>
                  <div className='menu-item'>
                    <FaReceipt className='menu-item-icon'/>
                    Мои заказы
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/banquet'>
                  <div className='menu-item'>
                    <ImGlass className='menu-item-icon'/>
                    Банкеты
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/vacancies'>
                  <div className='menu-item'>
                    <MdWork className='menu-item-icon'/>
                    Вакансии
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/settings'>
                  <div className='menu-item'>
                    <IoSettings className='menu-item-icon'/>
                    Настройки
                  </div>
                </Link>
              </li>

              <li>
                <Link to='/interior'>
                  <div className='menu-item'>
                    <BsImage className='menu-item-icon'/>
                    Интерьер
                  </div>
                </Link>
              </li>

              <li>
                <Link to='/contacts'>
                  <div className='menu-item'>
                    <RiContactsBookFill className='menu-item-icon'/>
                    Контакты
                  </div>
                </Link>
              </li>
              <li>
                <CartWidget/>
              </li>
              <li>
                <button className='primary-button' onClick={logout}>Выйти</button>
              </li>
            </ul>
          </div>
        </div>
      }
    </div>
  );
}

export default NavMenu;