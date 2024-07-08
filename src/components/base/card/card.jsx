import React, { useEffect, useRef } from 'react';

const Card = ({ image, name, price, category, rating, classname, onClick }) => {
    const renderRatingStars = () => {
        const maxRating = 5;
        const filledStars = Math.round(rating);

        const stars = [];

        for (let i = 0; i < maxRating; i++) {
            if (i < filledStars) {
                stars.push(<span key={i} className="text-yellow-400">&#9733;</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300">&#9734;</span>);
            }
        }

        return stars;
    };

    return (
        <div onClick={onClick} className={`bg-white w-56 h-auto shadow-md cursor-pointer rounded-lg overflow-hidden ${classname}`}>
            <img className="aspect-video object-cover" src={image} alt="image" />
            <div className='flex flex-col p-4 gap-2'>
                <h2 className="text-md font-semibold">{name}</h2>
                <h2 className=" text-red-maroon text-xl font-semibol">${price}</h2>
                <p className="text-gray-400 text-sm">{category}</p>
                <div className=" text-yellow-400">
                    {renderRatingStars()}
                </div>
            </div>
        </div>
    );
};

export default Card;
