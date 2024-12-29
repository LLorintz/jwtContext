import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // useAuth hook importálása

type Credentials = {
  username: string;
  password: string;
};

const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
  const { isAuthenticated, login } = useAuth(); // useAuth hook használata
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      login(token);
      navigate('/accounts');
    }
  }, [isAuthenticated, login, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (data.success) {
      login(data.token);
      localStorage.setItem('user', credentials.username)
      navigate('/accounts');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        onChange={handleChange}
        name="username"
        placeholder="Enter user name..."
      />
      <input
        type="password"
        onChange={handleChange}
        name="password"
        placeholder="password ..."
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
