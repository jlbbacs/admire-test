import React, { useState, useRef } from 'react';

const CategoryApp = () => {
  const scrollRef = useRef(null); // Reference to the slider container
  const [activeCategory, setActiveCategory] = useState('Nature');

  const data = {
    Nature: [
      { id: 1, title: "Mountain", img: "https://picsum.photos/id/10/200/150" },
      { id: 2, title: "Forest", img: "https://picsum.photos/id/11/200/150" },
      { id: 3, title: "Lake", img: "https://picsum.photos/id/15/200/150" },
      { id: 4, title: "River", img: "https://picsum.photos/id/19/200/150" },
    ],
    City: [
      { id: 5, title: "Streets", img: "https://picsum.photos/id/43/200/150" },
      { id: 6, title: "Metro", img: "https://picsum.photos/id/48/200/150" },
      { id: 7, title: "Bridge", img: "https://picsum.photos/id/84/200/150" },
    ],
    Space: [
      { id: 8, title: "Nebula", img: "https://picsum.photos/id/54/200/150" },
      { id: 9, title: "Galaxy", img: "https://picsum.photos/id/75/200/150" },
      { id: 10, title: "Void", img: "https://picsum.photos/id/96/200/150" },
    ]
  };

  // Function to handle scrolling
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -200, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {/* Category Selection */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.keys(data).map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeCategory === cat ? '#333' : '#ddd',
              color: activeCategory === cat ? 'white' : 'black',
              border: 'none', cursor: 'pointer', borderRadius: '4px'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={() => scroll('left')}>← Prev</button>
        <button onClick={() => scroll('right')}>Next →</button>
      </div>

      {/* Slider Container */}
      <div 
        ref={scrollRef}
        style={{ 
          display: 'flex', 
          overflowX: 'hidden', // Hide scrollbar for a cleaner "slider" look
          gap: '15px', 
          padding: '10px',
          border: '1px solid #ccc'
        }}
      >
        {data[activeCategory].map((item) => (
          <div key={item.id} style={{ flex: '0 0 200px' }}>
            <img src={item.img} alt={item.title} style={{ width: '100%', borderRadius: '8px' }} />
            <p style={{ textAlign: 'center' }}>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryApp;