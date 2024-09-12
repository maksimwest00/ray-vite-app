import React, {useEffect, useState} from 'react';
import axios from "axios";

//APP imports
import Nav from "../components/Nav";
import {ENDPOINTS} from "../config/ENDPOINTS";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../components/Footer";

interface IObjectKeys {
  [key: string]: any;
}

interface LoginType extends IObjectKeys{
  email: any,
  password: string,
  stayLoggedIn: boolean
}

function Login() {
  const [formData, setFormData] = useState<LoginType>({
    email: '',
    password: '',
    stayLoggedIn: false
  });
  const [error, setError] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string|null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, []);


  const handleInputChange = (ev: React.FormEvent<HTMLElement>) => {
    const input = ev.target as HTMLInputElement
    const value = input.type === 'checkbox' ? input.checked : input.value
    setFormData((prevState: LoginType) => {
      return {
        ...prevState,
        [input.name]: value
      }
    })
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    let locError: string[] = []
    Object.keys(formData).forEach((field:string) => {
      if(formData[field].length === 0) {
        locError.push(field)
      }
    })

    if(locError.length > 0) {
      setError(locError)
      setErrorMessage('Пожалуйста заполните все обьязательные поля')
      return
    }

    setError([])
    axios.post(`${ENDPOINTS.login}`, formData).then((res) => {
      if(res.data.user) {
        localStorage.setItem('token', res.data.user)
        navigate('/dashboard')
      } else {
        throw new Error('error')
      }
    }).catch(e => {
      console.log('Error', e)
      setErrorMessage('Неверно введен email и/или пароль!')
    })

  }

  return (
    <div className='login'>
      <Nav showBtn='signup'/>
      <div className='signup-container'>
        <h3>Логин</h3>
        {
          (error.length > 0 || errorMessage !== null) && <div className='form-error'>
            {errorMessage}
          </div>
        }
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              name='email'
              className={error.includes('email') ? 'input-error' : ''}
              placeholder='ivan@yandex.ru'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-control'>
            <label htmlFor='password'>Пароль:</label>
            <input
              id='password'
              type='password'
              name='password'
              className={error.includes('password') ? 'input-error' : ''}
              placeholder='••••••••••'
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-inline-control">
            <input
              id='stay_logged_in'
              type='checkbox'
              name='stayLoggedIn'
              checked={formData.stayLoggedIn}
              onChange={handleInputChange}
            />
            <label htmlFor="stay_logged_in" style={{lineHeight: 'bottom'}}>Оставться в системе</label>
          </div>

          <div className="form-inline-control">
            <Link to="/forget-password" style={{fontSize: 14, color: '#ccc'}}>Забыли пароль?</Link>
          </div>

          <div className='form-buttons'>
            <button className='primary-button' type='submit'>Войти</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
