import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ENDPOINTS} from "../../config/ENDPOINTS";
import {useNavigate} from "react-router-dom";

function Admin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string|null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('admin')
    if (token) navigate('/admin-dashboard')
  }, [])

  const handleLogin = (ev: any) => {
    ev.preventDefault();

    if(formData.email === '' || formData.password === '') {
      setError('Пожалуйста заполните все обьязательные поля')
      return
    }


    axios.post(`${ENDPOINTS.adminLogin}`, formData).then((res ) => {
      localStorage.setItem('admin', res.data.admin)
      navigate('/admin-dashboard')
    }).catch(e => {
      setError('Неверно введен email и/или пароль!')
    })
  }

  const handleInputChange = (ev: React.FormEvent<HTMLElement>) => {
    const input = ev.target as HTMLInputElement
    const value = input.type === 'checkbox' ? input.checked : input.value

    setFormData((prevState: any) => {
      return {
        ...prevState,
        [input.name]: value
      }
    })
  }

  return (
    <div className='admin-page'>
      <div className='login-form'>
        <h2 style={{textAlign: 'center'}}>Войти</h2>
        <form onSubmit={handleLogin}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {error && <p className='form-error' style={{color: '#fff', width: 400, textAlign: 'center'}}>{error}</p>}
          </div>
          <div className="form-control">
            <input type="text" name="email" placeholder="email" value={formData.email} onChange={handleInputChange}/>
          </div>
          <div className="form-control">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
          </div>
          <div className="login-form-control">
            <button type="submit" className="primary-button small-btn">Войти</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Admin;
