import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AiFillCloseCircle} from "react-icons/ai"
import {MdRestaurantMenu, MdWork} from "react-icons/md"
import {FaShoppingBasket} from "react-icons/fa"
import {IoSettings} from "react-icons/io5"
import {TiContacts} from "react-icons/ti"
import {FaReceipt} from "react-icons/fa"
import {ImGlass} from "react-icons/im";
import {BsImage} from "react-icons/bs";

function SideBar({setShowSideBar}: any) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <h3>Ресторан Райхан</h3>
        <div>
          <button className="icon-button square-corners" onClick={() => setShowSideBar(false)}>
            <AiFillCloseCircle color="#18863b" style={{display: 'flex', fontSize: '18pt'}}/>
          </button>
        </div>
      </div>
      <div className="sidebar-body">
        <ul>
          <li>
            <Link to='/dashboard'>
              <div className='sidebar-menu-item' onClick={() => setShowSideBar(false)}>
                <MdRestaurantMenu className='sidebar-menu-item-icon'/>
                Меню
              </div>
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <div className='sidebar-menu-item' onClick={() => setShowSideBar(false)}>
                <FaShoppingBasket className='sidebar-menu-item-icon' />
                Корзина
              </div>
            </Link>
          </li>
          <li>
            <Link to='/orders'>
              <div className='sidebar-menu-item' onClick={() => setShowSideBar(false)}>
                <FaReceipt className='sidebar-menu-item-icon' />
                Мои заказы
              </div>
            </Link>
          </li>
          <li>
            <Link to='/banquet'>
              <div className='sidebar-menu-item' onClick={() => setShowSideBar(false)}>
                <ImGlass className='sidebar-menu-item-icon' />
                Банкеты
              </div>
            </Link>
          </li>
          <li>
            <Link to='/vacancies'>
              <div className='sidebar-menu-item' onClick={() => setShowSideBar(false)}>
                <MdWork className='sidebar-menu-item-icon' />
                Вакансии
              </div>
            </Link>
          </li>
          <li>
            <Link to='/settings'>
              <div className='sidebar-menu-item' onClick={() => setShowSideBar(false)}>
                <IoSettings className='sidebar-menu-item-icon'/>
                Настройки
              </div>
            </Link>
          </li>
          <li>
            <Link to='/interior'>
              <div className='sidebar-menu-item' onClick={() => setShowSideBar(false)}>
                <BsImage className='sidebar-menu-item-icon'/>
                Интерьер
              </div>
            </Link>
          </li>
          <li>
            <Link to='/contacts'>
              <div className='sidebar-menu-item' onClick={() => setShowSideBar(false)}>
                <TiContacts className='sidebar-menu-item-icon'/>
                Контакты
              </div>
            </Link>
          </li>
          <li>
            <button className='primary-button' onClick={logout}>Выйти</button>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default SideBar;