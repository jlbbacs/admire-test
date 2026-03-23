import React, { useState, useRef, useEffect } from 'react';

const CategoryApp = () => {
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(''); // New: Track typing
  const [activeCategory, setActiveCategory] = useState('Nature');

  const data = {
    Nature: [
      { id: 1, title: "Mountain", img: "https://picsum.photos/id/10/200/150" },
      { id: 2, title: "Forest", img: "https://picsum.photos/id/11/200/150" },
      { id: 3, title: "Lake", img: "https://picsum.photos/id/15/200/150" },
    ],
    City: [
      { id: 4, title: "Streets", img: "https://picsum.photos/id/43/200/150" },
      { id: 5, title: "Metro", img: "https://picsum.photos/id/48/200/150" },
    ],
    Space: [
      { id: 6, title: "Nebula", img: "https://picsum.photos/id/54/200/150" },
      { id: 7, title: "Galaxy", img: "https://picsum.photos/id/75/200/150" },
    ]
  };

  // Logic: Search and Update Category
  useEffect(() => {
    const categories = Object.keys(data);
    // Find a category that starts with the search term (case insensitive)
    const found = categories.find(cat => 
      cat.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    
    if (found) {
      setActiveCategory(found);
    }
  }, [searchTerm]); // Run this every time the user types

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = direction === 'left' ? -250 : 250;
    current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      
      {/* 1. Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          placeholder="Search categories (e.g. Space)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* 2. Category Buttons (Visual indicators) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.keys(data).map((cat) => (
          <button 
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSearchTerm(cat); // Sync search bar with button click
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: activeCategory === cat ? '#007bff' : '#eee',
              color: activeCategory === cat ? 'white' : 'black',
              border: 'none', borderRadius: '20px', cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Navigation & Slider */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => scroll('left')} style={navBtnStyle}>←</button>
        
        <div 
          ref={scrollRef}
          style={{ 
            display: 'flex', 
            overflowX: 'hidden', 
            gap: '15px', 
            width: '80%',
            padding: '10px'
          }}
        >
          {data[activeCategory].map((item) => (
            <div key={item.id} style={{ flex: '0 0 200px', textAlign: 'center' }}>
              <img src={item.img} alt={item.title} style={{ width: '100%', borderRadius: '10px' }} />
              <p><b>{item.title}</b></p>
            </div>
          ))}
        </div>

        <button onClick={() => scroll('right')} style={navBtnStyle}>→</button>
      </div>
    </div>
  );
};

// Simple reusable style for nav arrows
const navBtnStyle = {
  background: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  cursor: 'pointer'
};

export default CategoryApp;