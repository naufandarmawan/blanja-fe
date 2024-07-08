/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './product.css';

import tshirt1 from '../../assets/products/tshirt1.svg';
import ProductInfo from '../../components/module/productpage/productInfo';
import Review from '../../components/module/product review/review';
import Recommend from '../../components/module/recommend/recommend';
import Button from '../../components/base/button/button';
import ButtonWhite from '../../components/base/button/buttonwhite';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import defaultimage from '../../../public/No-image-available.png';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const images = [
        tshirt1
    ];
    const [mainImage, setMainImage] = useState(images[0]);
    const [selectedColor, setSelectedColor] = useState('');
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [products, setProducts] = useState({});

    const colors = [
        { name: 'Black', value: 'black' },
        { name: 'Red', value: 'red' },
        { name: 'Blue', value: 'blue' },
        { name: 'Green', value: 'green' }
    ];

    const handleSizeChange = (increment) => {
        setSize(prevSize => Math.max(0, prevSize + increment));
    }

    const handleQuantityChange = (increment) => {
        setQuantity(prevQuantity => Math.max(0, prevQuantity + increment));
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `${import.meta.env.VITE_URL_BLANJA}/products/${id}`,
        })
            .then((res) => {
                const result = res.data.data;
                setProducts(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id])

    const handleAddBag = () => {
        const token = localStorage.getItem('token');
        console.log(token);
        const orderDetails = {
            products_id: products.products_id,
            color: selectedColor,
            quantity: quantity.toString(),
            size: size.toString(),
        };
        console.log(orderDetails);

        console.log('Order Details:', orderDetails);

        axios.post(`${import.meta.env.VITE_URL_BLANJA}/order/${id}`, orderDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                toast.success('Add Bag Success!!');
            })
            .catch((error) => {
                console.error('Failed to add to bag:', error.response ? error.response.data : error.message);
                toast.error(`Failed to add to bag`);
            });
    };

    const handleBuyNow = () => {
        const token = localStorage.getItem('token');
        const orderDetails = {
            products_id: products.products_id,
            color: selectedColor,
            quantity: quantity.toString(),
            size: size.toString(),
        };

        console.log('Order Details:', orderDetails);

        axios.post(`${import.meta.env.VITE_URL_BLANJA}/order/${id}`, orderDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                navigate('/mybag')
                console.log(response.data);
                toast.success('Buying Success!!');
            })
            .catch((error) => {
                console.error('Failed to add to bag:', error.response ? error.response.data : error.message);
                toast.error(`Failed to add to bag`);
            });
    };

    const imageDefault = '/notfound.png';

    return (
        <div className='product-container'>
            <nav className='parameter'>
                <a href="/home">Home</a> &gt;
                <a href="/category">Category</a> &gt;
                <span>T-Shirt</span>
            </nav>

            <div className='flex w-96 py-10 gap-10'>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={products.image || imageDefault}
                        alt={`thumbnail ${index + 1}`}
                        className='thumbnail'
                        onClick={() => setMainImage(image)}
                    />
                ))}
                <div>
                    <h1 className='text-4xl font-semibold'>{products.name}</h1>
                    <p className='text-lg font-medium text-gray-400 py-5'>{products.category}</p>
                    <div className='relative bottom-5 text-gray-400'>
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className='star filled'>&#9733;</span>
                        ))}
                        (10)
                    </div>
                    <div>
                        <p className='text-lg font-medium text-gray-400'>Price</p>
                        <h1 className='text-4xl font-bold'>$ {products.price}</h1>
                    </div>
                    <div className='py-5'>
                        <p className='text-gray-700 font-medium'>Color</p>
                        <div className='color-options'>
                            {colors.map((color) => (
                                <label key={color.value} className='color-label'>
                                    <input
                                        type='radio'
                                        name='color'
                                        value={color.value}
                                        checked={selectedColor === color.value}
                                        onChange={() => setSelectedColor(color.value)}
                                    />
                                    <span className='color-circle' style={{ backgroundColor: color.value }}></span>
                                </label>
                            ))}
                        </div>
                        <div className='addproduct flex flex-row gap-10 py-5 font-medium'>
                            <div>
                                <label className='right-4 z-0'>Size</label>
                                <div className='control py-3'>
                                    <button onClick={() => handleSizeChange(-1)}>-</button>
                                    <span>{size}</span>
                                    <button onClick={() => handleSizeChange(+1)}>+</button>
                                </div>
                            </div>
                            <div>
                                <label className='right-4 z-0'>Quantity</label>
                                <div className='control py-3'>
                                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => handleQuantityChange(+1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-1 flex-row gap-5 text-nowrap font-semibold py-2'>
                            <p>Size Available: {products.size}</p>
                            <p>Stock Available: {products.stock}</p>
                            <p>Color Available: {products.color}</p>
                        </div>
                        <div className='flex flex-row gap-5 text-center z-30'>
                            <ButtonWhite
                                className="bg-white w-36 text-gray-700 hover:text-white"
                                name="Chat"
                            />
                            <ButtonWhite
                                className="bg-white w-36 text-gray-700 hover:text-white"
                                name="Add bag"
                                onClick={handleAddBag}
                            />
                            <Button
                                name="Buy Now"
                                onClick={handleBuyNow}
                            />
                        </div>
                    </div>
                </div>
                <ToastContainer position='bottom-right' />
            </div>

            <div className='flex flex-col py-28 gap-10'>
                <div>
                    <ProductInfo products={products} />
                </div>
                <div className='absolute py-88'>
                    <Review />
                </div>
                <div className='relative top-96'>
                    <hr className='w-286' />
                    <div className='py-5'>
                        <Recommend />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
