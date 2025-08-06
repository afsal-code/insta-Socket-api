 import React, { useState } from 'react';
import './Home.scss';
 
export default function Home() {
  const [showModal, setShowModal] = useState(false);
 
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
 
  return (
    <div className="home-container">
      <main className="container">
        <h1>Welcome</h1>
        <button className="create-post-btn" onClick={handleOpenModal}>+</button>
      </main>
 
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create a Post</h2>
            <input type="file" accept="image/*" />
            <textarea placeholder="Write a caption..." />
            <div className="modal-buttons">
              <button className="close-btn" onClick={handleCloseModal}>Close</button>
              <button className="post-btn">Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
    //ok
  );
}