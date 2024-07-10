/* eslint-disable no-unused-vars */
import React from 'react';
import Carousel from '../../components/module/slider/carousel';
import Category from '../../components/module/category/category';
import New from '../../components/module/new/new';
import Popular from '../../components/module/popular/popular';

const Home = () => {
  return (
    <div className='py-32'>
      <Carousel/>
      <div className='flex py-10 px-16'>
        <Category/>
      </div>
      {/* <div className='flex px-16'>
        <New/>
      </div> */}
      <div className='flex py-5 px-16'>
        <Popular/>
      </div>
    </div>
  )
}

export default Home