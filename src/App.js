import React, { useState } from 'react';

const fruits = [
  { name: 'Apple', img: 'images/apple.jpg' },
  { name: 'Banana', img: 'images/bananna.jpg' },
  { name: 'Blueberry', img: 'images/blueberry.jpg' },
  { name: 'Mango', img: 'images/Mango.jpg' },
  { name: 'Orange', img: 'images/orange.jpg' },
  { name: 'Strawberry', img: 'images/strawberry.jpg' },
  { name: 'Grape', img: 'images/grape.jpg' },
  { name: 'Watermelon', img: 'images/watermelon.jpg' },
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
