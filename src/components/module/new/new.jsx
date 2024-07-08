/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../base/card/card';
import axios from 'axios';

const New = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
    totalData: 0,
  });
  const navigate = useNavigate();

  const fetchData = (page) => {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_URL_BLANJA}/products`,
      params: {
        page: page,
        limit: pagination.limit,
      },
    })
      .then((res) => {
        const result = res.data.data;
        const { limit, page, totalData } = res.data.pagination;
        setProducts(result);
        setPagination({ limit, page, totalData });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const imageDefault = '/notfound.png';

  return (
    <div className='w-full'>
      <h1 className='text-4xl font-semibold'>New</h1>
      <p className='text-md text-gray-400 py-2'>You’ve never seen it before!</p>
      <div className='w-full flex justify-between'>
        {products && products.map((item) => (
            <Card
              key={item.products_id}
              image={item.image || imageDefault}
              name={item.name}
              price={item.price}
              category={item.category}
              rating={4.5}
              onClick={() => navigate(`/products/${item.products_id}`)}
            />
        ))}
      </div>
    </div>
  );
};

export default New;
