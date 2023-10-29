import React, { useState } from 'react';
import appleImage from './images/apple.jpeg';
import banannaImage from './images/bananna.jpeg';
import blueberryImage from './images/blueberry.jpeg';
import mangoImage from './images/Mango.jpeg';
import orangeImage from './images/orange.jpeg';
import strawberryImage from './images/strawberry.jpeg';
import grapeImage from './images/grape.jpeg';
import watermelonImage from './images/watermelon.jpeg';


const fruits = [
  { name: 'Apple', img: appleImage},
  { name: 'Banana', img: banannaImage},
  { name: 'Blueberry', img: blueberryImage },
  { name: 'Mango', img: mangoImage },
  { name: 'Orange', img: orangeImage},
  { name: 'Strawberry', img: strawberryImage },
  { name: 'Grape', img: grapeImage },
  { name: 'Watermelon', img: watermelonImage },
];

function App() {
  const [inputValue, setInputValue] = useState('');
  const [filteredFruits, setFilteredFruits] = useState(fruits);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = fruits.filter(fruit =>
      fruit.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredFruits(filtered);
  };

  return (
    <div className="combo-box">
      <h1>Tommy</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type or select a fruit..."
      />
      <div className="dropdown">
        {filteredFruits.map(fruit => (
          <div key={fruit.name} className="dropdown-item" onClick={() => setInputValue(fruit.name)}>
            <img src={fruit.img} alt={fruit.name} />
            {fruit.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
