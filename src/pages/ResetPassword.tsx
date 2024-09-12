import {useEffect, useState} from 'react';
import axios from "axios";

//APP imports
import Nav from "../components/Nav";
import {ENDPOINTS} from "../config/ENDPOINTS";
import {useNavigate, useParams} from "react-router-dom";
import Footer from "../components/Footer";

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string|null>(null)
  const {hash} = useParams()
  console.log('hash', hash)

  const [success, setSuccess] = useState<string>('')

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, []);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()

    if(password === confirmPassword) {
      setErrorMessage('')

      axios.put(`${ENDPOINTS.resetPassword}`, {
        password,
        hash
      }).then((res) => {
        setErrorMessage(null)
        setSuccess('Ваш пароль успешно изменен!')
      }).catch(e => {
        console.log('Error', e)
        setErrorMessage('Что-то пошло не так, попробуйте еще раз!')
      })
    }


  }

  return (
    <div className='login'>
      <Nav showBtn='signup'/>
      <div className='signup-container'>
        <h3>Введите новый пароль</h3>
        {
          (errorMessage !== null) && <div className='form-error'>
            {errorMessage}
          </div>
        }
        {
          success.length > 0 && <div className='form-success'>
            {success}
          </div>
        }
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='email'>Пароль:</label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Потвердите пароль:</label>
            <input
              id='confirm-password'
              type='password'
              name='confirm-password'
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          </div>

          <div className='form-buttons'>
            <button className='primary-button' type='submit'>Изменить пароль</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
