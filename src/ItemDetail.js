import React, { useState, useEffect } from 'react';
import './App.css';

function ItemDetail({match}) {

  const rarStyle = {
    color: ''
  }

  useEffect(() => {
    fetchItem();
    console.log(match);
  }, []);

  const [item, setItem] = useState({
    images: {},
    ratings: {}
  });

  const fetchItem = async () => {
    const fetchItem = await fetch(`https://fortnite-public-api.theapinetwork.com/prod09/item/get?ids=${match.params.id}`);
    const item = await fetchItem.json();

    setItem(item);
    console.log(item);
  }

  const checkRarity = () => {
    switch (item.rarity) {
      case 'rare':
        rarStyle.color = "#157FC1";
      break;
      case 'epic':
        rarStyle.color = "#8D21B6";
      break;
      case 'uncommon':
        rarStyle.color = "#117B09";
      break;
    }
  }

  checkRarity();

  return (
    <div className="item-info">
      <h1 className="item.title">{item.name}</h1>
      <img src={item.images.background} alt=""/>
      <p className="description">{item.description}</p>
      <p style={rarStyle} className="rarity">Rarity: {item.rarity}</p>

      <div className="info-block">
        <div className="ratings">
          <i className="fas fa-star"></i><span>{item.ratings.avgStars}</span>
          <p>Number of votes: {item.ratings.numberVotes}</p>
          <p>Total points: {item.ratings.totalPoints}</p>
        </div>

        <div className="additional">
          <span>Type: {item.type}</span>
          <p>Cost: {item.cost}</p>
          <p>{item.upcoming === 1 ? 'Coming soon' : 'Not coming ever'}</p>
        </div>
      </div>
      
    </div>
  );
}

export default ItemDetail;
