import React, { useState } from 'react'
import Input from '../../components/base/Input'
import Button from '../../components/base/Button'
import api from '../../configs/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const RegisterCustomer = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  })

  const handleRegister = (e) => {
    e.preventDefault()
    // console.log(form);
    if (!form.name || !form.email || !form.password) {
      toast.error('All fields are required');
      return
    }
    api.post('/register/customers', {
      email: form.email,
      password: form.password,
      name: form.name,
    })
      .then((res) => {
        console.log(res.response);
        toast.success("Register success")
        // alert(`Register berhasil dengan email ${form.email} dan password ${form.password}. Silakan Login`)
        navigate('/auth/login')
      })
      .catch((err) => {
        console.log(err.response);
        const error = err.response.data
        toast.error(`Register failed - ${error.message}`)
        // alert(`Anda gagal register - ${error.message}`)
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

export default RegisterCustomer