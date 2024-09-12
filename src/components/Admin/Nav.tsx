import React from 'react';
import {Link, useNavigate} from "react-router-dom";

function Nav() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('admin')
    navigate('/admin')
  }

  return (
    <div className='admin-dashboard-menu'>
      <ul>
        <li>
          <Link to='/admin-dashboard'>Заказы</Link>
        </li>
        <li>
          <Link to='/admin-dashboard/menu'>Меню</Link>
        </li>
        <li>
          <span onClick={logout}>Выйти</span>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
