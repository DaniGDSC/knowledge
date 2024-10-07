import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        alert('Logged in successfully!');
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="container">
      <div className="login-section">
        <h1>Sign in</h1>
        <p>Use your Account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-footer">
            <div className="role-selection">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                /> User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                /> Admin
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="guest"
                  checked={role === 'guest'}
                  onChange={() => setRole('guest')}
                /> Guest
              </label>
            </div>
            <button type="submit">Next</button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
        <div className="account-options">
          <a href="/signup">Create account</a>
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>
      <div className="slogan-section">
        <img src="/api/placeholder/100/100" alt="Logo" className="logo" />
        <h1>Welcome</h1>
        <p>One account. All services working for you.</p>
      </div>
    </div>
  );
};

export default LoginPage;