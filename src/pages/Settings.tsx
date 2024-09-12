import React, {useState} from 'react';
import Nav from "../components/Nav";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {ENDPOINTS} from "../config/ENDPOINTS";

function Settings() {
  const [formData, setFormData] = useState({
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (ev: any) => {
    ev.preventDefault()
    if (formData.address !== '' || formData.phone !== '') {
      const token: any = localStorage.getItem('token')
      const tk_values: any = jwtDecode(token)
      const id = tk_values.id

      if (id) {
        axios.put(`${ENDPOINTS.user}/`, {
          id,
          ...formData
        })
          .then((res: any) => {
            console.log(res)
            setSuccessMessage('Данные успешно обнавлены!')
          }).catch(err => {
          console.log(err.message)
        })
      }
    } else {
      setError('Данные не были введены!')
    }
  }


  return (
    <div className='dashboard'>
      <Nav showBtn={null}/>
      <div className='page settings-page'>
        <h3>Настройки</h3>
        <div>
          {error && <p className='form-error'>{error}</p>}
          {successMessage && <p className='form-success'>{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="address">Изменить Адресс</label>
              <input type="text" id='address' name='address' placeholder="Адрес" value={formData.address}
                     onChange={(ev: any) => setFormData({
                       ...formData,
                       address: ev.target.value
                     })}/>
            </div>
            <div className="form-control">
              <label htmlFor="phone">Изменить Номер</label>
              <input type="tel" id='phone' name='tel' placeholder="Телефон" value={formData.phone}
                     onChange={(ev: any) => setFormData({
                       ...formData,
                       phone: ev.target.value
                     })}/>
            </div>
            <div className="form-control">
              <button className='primary-button'>Изменить</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Settings;
