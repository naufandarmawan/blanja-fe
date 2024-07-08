/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/base/card/card';
import axios from 'axios';
import './search.css';

const SearchQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    totalData: 0,
    totalPage: 1,
  });
  const query = SearchQuery().get('query') || '';
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('asc');

  const fetchData = (page) => {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_URL_BLANJA}/products`,
      params: {
        search: query,
        page: page,
        limit: pagination.limit,
      },
    })
      .then((res) => {
        const result = res.data.data;

        if (sortBy === 'asc') {
          result.sort((a, b) => (a.name > b.name) ? 1 : -1);
        } else {
          result.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }
        const { limit, page, totalData, totalPage } = res.data.pagination;
        setProducts(result);
        setPagination({ limit, page, totalData, totalPage });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(1);
  }, [query, sortBy]);

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPage) {
      fetchData(pagination.page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      fetchData(pagination.page - 1);
    }
  };

  const handleSortAsc = () => {
    setSortBy('asc');
  }

  const handleSortDesc = () => {
    setSortBy('desc');
  }

  const imageDefault = '/notfound.png';

  return (
    <div>
      <h1 className='text-4xl font-semibold'>Find Product</h1>
      <p className='text-md text-gray-400 py-2'>Let’s Find Something New!</p>
      <div className='flex py-10 z-20 justify-center'>
        <button className='bg-red-maroon text-white font-semibold px-4 py-2 rounded mr-2 hover:bg-orange-500' onClick={handleSortAsc}>
          ASC
        </button>
        <button className='bg-red-maroon text-white font-semibold px-4 py-2 rounded hover:bg-orange-500' onClick={handleSortDesc}>
          DESC
        </button>
      </div>
      <div className='flex justify-center'>
        <div className='grid grid-cols-5 gap-4'>
          {products.length > 0 ? (
            products.map((item) => (
              <Card
                key={item.products_id}
                image={item.image || imageDefault}
                name={item.name}
                price={item.price}
                category={item.category}
                rating={4.5}
                onClick={() => navigate(`/products/${item.products_id}`)}
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
      <div className='flex justify-center gap-4 py-10'>
        <button
          className='bg-gray-300 px-4 py-2 rounded'
          onClick={handlePrevPage}
          disabled={pagination.page === 1}
        >
          Previous
        </button>
        <button
          className='bg-gray-300 px-4 py-2 rounded'
          onClick={handleNextPage}
          disabled={pagination.page === pagination.totalPage}
        >
          Next
        </button>
      </div>
      <p className='text-center text-gray-500'>
        Page {pagination.page} of {pagination.totalPage}
      </p>
    </div>
  );
};

export default SearchPage;
