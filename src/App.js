import React, { useState, useRef, useEffect } from 'react';
import appleImage from './images/apple.jpeg';
import banannaImage from './images/bananna.jpeg';
import blueberryImage from './images/blueberry.jpeg';
import mangoImage from './images/Mango.jpeg';
import orangeImage from './images/orange.jpeg';
import strawberryImage from './images/strawberry.jpeg';
import grapeImage from './images/grape.jpeg';
import watermelonImage from './images/watermelon.jpeg';
import './App.css';

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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const comboBoxRef = useRef(null);
  const displayFruits = selectedFruit ? fruits.filter(fruit => fruit.name === selectedFruit) : filteredFruits;

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        if (focusedIndex < displayFruits.length - 1) {
          setFocusedIndex(prevIndex => prevIndex + 1);
        } else {
          setFocusedIndex(0); 
        }
        break;
  
      case 'ArrowUp':
        if (focusedIndex > 0) {
          setFocusedIndex(prevIndex => prevIndex - 1);
        } else {
          setFocusedIndex(displayFruits.length - 1);
        }
        break;
  
      case 'Enter':
        if (focusedIndex >= 0 && focusedIndex < displayFruits.length) {
          handleFruitClick(displayFruits[focusedIndex].name);
        }
        break;
  
      case 'Escape':
        setDropdownVisibility(false);
        setFocusedIndex(-1);
        break;
  
      default:
        break;
    }
  };

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
    <div className="app-container">
      <div className="combo-box" ref={comboBoxRef}>
        <h3>Tommy Combo Box</h3>
        <div className="wrapper" aria-haspopup="listbox" aria-expanded={isDropdownVisible}>
          <input
            type="text"
            className='search-input-field'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setDropdownVisibility(true);
              setSelectedFruit(null);
            }}
            aria-autocomplete="list"
            aria-controls="fruit-list"
            placeholder="Choose a Fruit..."
          />
          <span className="arrow">▼</span>
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
                style={{ backgroundColor: isHovered === fruit.name || displayFruits[focusedIndex]?.name === fruit.name ? '#f0f0f0' : '#fff'}}
              >
                <img src={fruit.img} alt={fruit.name} />
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
