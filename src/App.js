import React, { useState, useRef, useEffect } from 'react';
import appleImage from './images/apple.jpeg';
import banannaImage from './images/bananna.jpeg';
import blueberryImage from './images/blueberry.jpeg';
import mangoImage from './images/Mango.jpeg';
import orangeImage from './images/orange.jpeg';
import strawberryImage from './images/strawberry.jpeg';
import grapeImage from './images/grape.jpeg';
import watermelonImage from './images/watermelon.jpeg';

const fruits = [
  { name: 'Apple', img: appleImage },
  { name: 'Banana', img: banannaImage },
  { name: 'Blueberry', img: blueberryImage },
  { name: 'Mango', img: mangoImage },
  { name: 'Orange', img: orangeImage },
  { name: 'Strawberry', img: strawberryImage },
  { name: 'Grape', img: grapeImage },
  { name: 'Watermelon', img: watermelonImage },
];

function App() {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredFruits, setFilteredFruits] = useState(fruits);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const comboBoxRef = useRef(null);
  const displayFruits = selectedFruit ? fruits.filter(fruit => fruit.name === selectedFruit) : filteredFruits;

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  const handleOutsideClick = (e) => {
    if (comboBoxRef.current && !comboBoxRef.current.contains(e.target)) {
      setDropdownVisibility(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!selectedFruit) {
      setDropdownVisibility(true);
      const filtered = fruits.filter(fruit =>
        fruit.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFruits(filtered);
    }
  };

  const handleFruitClick = (fruitName) => {
    setInputValue(fruitName);
    setSelectedFruit(fruitName);
    setDropdownVisibility(false);
  };

  return (
    <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="combo-box" ref={comboBoxRef}>
        <h3>Tommy Combo Box</h3>
        <div style={{ position: 'relative', width: '200px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => {
              setDropdownVisibility(true);
              setSelectedFruit(null);
            }}
            placeholder="Type or select a fruit..."
            style={{ padding: '8px', width: '100%' }}
          />
          <span style={{ position: 'absolute', right: '-10px', top: '38%', transform: 'translateY(-20%)', color: '#666'}}>▼</span>
        </div>
        {isDropdownVisible && ( 
          <div className="dropdown">
            {displayFruits.map(fruit => (
              <div
                key={fruit.name}
                className="dropdown-item"
                onClick={() => handleFruitClick(fruit.name)}
                onMouseEnter={() => setIsHovered(fruit.name)}
                onMouseLeave={() => setIsHovered(null)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderBottom: '1px solid #eee',
                  backgroundColor: isHovered === fruit.name ? '#f0f0f0' : '#fff', 
                  width: '197px',
                  transition: 'background-color 0.2s'
                }}
              >
                <img src={fruit.img} alt={fruit.name} style={{ width: '25px', marginRight: '10px' }} />
                {fruit.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
