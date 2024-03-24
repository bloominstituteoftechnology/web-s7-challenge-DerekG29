import React from 'react'
import { useNavigate } from 'react-router-dom'
import pizza from './images/pizza.jpg'

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>
        Welcome to Bloom Pizza!
      </h2>
      <img
        alt="order-pizza"
        style={{ cursor: 'pointer' }}
        src={pizza}
        onClick={() => navigate('order')}
      />
    </div>
  )
}

export default Home
