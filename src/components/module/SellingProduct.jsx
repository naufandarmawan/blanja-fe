import React, { useState } from 'react'
import FormContainer from '../../components/base/FormContainer'
import Input from '../../components/base/Input'
import Button from '../../components/base/Button'
import BigProductThumbnail from '../../assets/Group 1314.svg'
import SmallProductThumbnail from '../../assets/Group 1315.svg'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../../configs/api'
import { toast } from 'react-toastify';


const SellingProduct = () => {
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
        condition: "",
        description: "",
        image: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const resetForm = () => {
        setForm({
            name: "",
            category: "",
            price: "",
            stock: "",
            condition: "",
            description: "",
            image:""
        });
    };

    const handleSell = (e) => {
        e.preventDefault()
        // console.log(form);
        api.post('/products', {
            name: form.name,
            category: form.category,
            price: form.price,
            stock: form.stock,
            condition: form.condition,
            description: form.description,
            image: form.image
        })
            .then((res) => {
                console.log(res);
                toast.success(`Create Product Success`)
                // alert(`Create Product Success`)
                resetForm()

            })
            .catch((err) => {
                console.log(err.response);
                toast.error(err.response.data.message)
                // alert(err.response.data.message)
            })
    }

    const handleUpload = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        api.post(`/upload`, formData)
            .then((res) => {
                const { file_url } = res.data.data
                setForm({ ...form, image: file_url })
            })
            .catch((err) => {
                console.log(err.response);
            });
    }


    return (
        <div className='flex flex-col gap-8'>
            <FormContainer title='Inventory' subtitle=''>
                <div className='bg-[#d4d4d4] h-[1px] w-full'></div>
                <div className='flex flex-col gap-4 w-full'>
                    <Input
                        type='text'
                        value={form.name}
                        onChange={handleChange}
                        name="name"
                        label="Name of goods"
                        placeholder="Name of goods"
                    />
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="category" className="font-normal text-xs text-[#9EA0A5] text-left w-full">Category</label>
                        <select
                            value={form.category}
                            onChange={handleChange}
                            name="category"
                            id="category"
                            className='p-[15px] rounded-[4px] font-normal text-sm text-[#1F2A36] placeholder:text-[#858D96] outline-none border border-[#E2E5ED]'
                        >
                            <option value="">Select a category</option>
                            <option value="t-shirt">T-shirt</option>
                            <option value="shorts">Shorts</option>
                            <option value="jacket">Jacket</option>
                            <option value="pants">Pants</option>
                            <option value="shoes">Shoes</option>
                        </select>
                    </div>
                </div>
            </FormContainer>

            <FormContainer title='Item details' subtitle=''>
                <div className='bg-[#d4d4d4] h-[1px] w-full'></div>
                <div className='flex flex-col gap-4 w-full'>
                    <Input
                        type='text'
                        value={form.price}
                        onChange={handleChange}
                        name="price"
                        label="Unit price"
                        placeholder="Unit price"
                    />
                    <Input
                        type='text'
                        value={form.stock}
                        onChange={handleChange}
                        name="stock"
                        label="Stock"
                        placeholder="Stock"
                    />

                    <div >
                        {/* <Input /> */}
                        {/* <Input
                            type='text'
                            value={form.condition}
                            onChange={handleChange}
                            name="condition"
                            label="Condition"
                            placeholder="Condition"
                        /> */}
                        <div className='flex flex-col gap-2'>
                            <label className="font-normal text-xs text-[#9EA0A5] text-left w-full">Condition</label>
                            <div className='flex'>
                                <label className="flex items-center cursor-pointer gap-2">
                                    <input
                                        type="radio"
                                        value="new"
                                        name="condition"
                                        checked={form.condition === "new"}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <div className={`w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center
            ${form.condition === 'new' ? 'bg-red-500 border-red-500' : 'bg-white'}
        `}>
                                        {form.condition === 'new' && (
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <span className="text-gray-900">New</span>
                                </label>

                                <label className="flex items-center cursor-pointer gap-2">
                                    <input
                                        type="radio"
                                        value="second"
                                        name="condition"
                                        checked={form.condition === "second"}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <div className={`w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center ${form.condition === 'second' ? 'bg-red-500 border-red-500' : 'bg-white'}`}>
                                        {form.condition === 'second' && (
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <span className="text-gray-900">Second</span>
                                </label>

                            </div>
                        </div>

                        {/* <div className='flex'>
                            <input type="radio" name="" id="" /> <label>Baru</label>
                            <input type="radio" name="" id="" /> <label>Bekas</label>
                        </div> */}
                    </div>
                </div>
            </FormContainer>

            <FormContainer title='Photo of goods' subtitle=''>
                <div className='bg-[#d4d4d4] h-[1px] w-full'></div>
                <div className='p-10 border border-dashed border-[#d4d4d4] flex flex-col gap-5 w-full'>

                    <div className='flex gap-4 items-center w-full'>
                        <div className='flex flex-col gap-2 items-center'>
                            <img className=' size-48 object-cover rounded-lg' src={form.image || BigProductThumbnail} alt="" />
                            <p className='font-medium text-sm text-[#9b9b9b]'>Main photo</p>
                        </div>
                        {/* <img className=' size-32 object-cover ' src={SmallProductThumbnail} alt="" />
                        <img className=' size-32 object-cover ' src={SmallProductThumbnail} alt="" />
                        <img className=' size-32 object-cover ' src={SmallProductThumbnail} alt="" />
                        <img className=' size-32 object-cover ' src={SmallProductThumbnail} alt="" /> */}
                    </div>

                    <div className='bg-[#d4d4d4] h-[1px] w-full'></div>
                    <label htmlFor='fileInput' className='w-56 p-[15px] bg-white border border-[#9b9b9b] rounded-full font-bold text-base leading-5 text-[#9b9b9b]'>
                        Upload photo
                    </label>
                    <input type="file" className='hidden' id='fileInput' onClick={handleUpload} />
                    {/* <Button variant='secondary-gray' className={"w-56"} text="Upload photo" onClick={handleUpload} /> */}

                </div>
            </FormContainer>

            <FormContainer title='Description' subtitle=''>
                <div className='bg-[#d4d4d4] h-[1px] w-full'></div>
                <div className='w-full'>
                    <Input
                        type='text'
                        value={form.description}
                        onChange={handleChange}
                        name="description"
                        label="Description"
                        placeholder="Description"
                    />
                    {/* <ReactQuill /> */}
                    {/* <ReactQuill style={{ height: "316px" }} /> */}
                </div>
            </FormContainer>

            <div className='flex justify-end'>
                <Button className={'w-48'} text="Jual" onClick={handleSell} />
            </div>
        </div>


    )
}

export default SellingProduct