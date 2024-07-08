import React, { useState } from 'react'
import Input from '../../components/base/Input'
import Button from '../../components/base/Button'
import api from '../../configs/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const RegisterSeller = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    store_name: '',
    password: '',
  })

  const handleRegister = (e) => {
    e.preventDefault()
    // console.log(form);
    if (!form.name || !form.email || !form.phone || !form.store_name || !form.password) {
      toast.error('All fields are required');
      return
    }

    api.post('/register/stores', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      store_name: form.store_name,
      password: form.password,
    })
      .then((res) => {
        console.log(res.response);
        // alert(`Register berhasil dengan email ${form.email} dan password ${form.password}. Silakan Login`)
        toast.success("Register success")
        navigate('/auth/login')
      })
      .catch((err) => {
        console.log(err.response);
        const error = err.response.data
        // alert(`Anda gagal register - ${error.message}`)
        toast.error(`Register failed - ${error.message}`)
      })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='w-full flex flex-col gap-10'>
      <div className='w-full flex flex-col gap-4'>
        <Input
          type='text'
          value={form.name}
          onChange={handleChange}
          name="name"
          label=""
          placeholder="Enter name"
        />
        <Input
          type='email'
          value={form.email}
          onChange={handleChange}
          name="email"
          label=""
          placeholder="Enter email"
        />
        <Input
          type='tel'
          value={form.phone}
          onChange={handleChange}
          name="phone"
          label=""
          placeholder="Enter phone number"
        />
        <Input
          type='text'
          value={form.store_name}
          onChange={handleChange}
          name="store_name"
          label=""
          placeholder="Enter store name"
        />
        <Input
          type='password'
          value={form.password}
          onChange={handleChange}
          name="password"
          label=""
          placeholder="Enter password"
        />
      </div>
      <Button className='w-full' onClick={handleRegister} text='Sign up' />
    </div>
  )
}

export default RegisterSeller