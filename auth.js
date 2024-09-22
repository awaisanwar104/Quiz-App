// Auth.js

import React, { useState } from 'react';
import './components/auth.css'; // CSS file for styling

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const storedUser = localStorage.getItem(formData.username);
      if (storedUser && JSON.parse(storedUser).password === formData.password) {
        setUser(formData.username);
        alert('Login Successful');
      } else {
        alert('Invalid username or password');
      }
    } else {
      localStorage.setItem(formData.username, JSON.stringify(formData));
      setUser(formData.username);
      alert('Signup Successful');
    }

    setFormData({ username: '', password: '' }); // Reset form
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <button onClick={() => setIsLogin((prev) => !prev)}>
        Switch to {isLogin ? 'Signup' : 'Login'}
      </button>
    </div>
  );
}

export default Auth;
