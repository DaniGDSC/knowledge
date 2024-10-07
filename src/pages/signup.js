import React, { useState, useEffect } from 'react';
import { Lock, User, Key } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [securityKey, setSecurityKey] = useState('');

  useEffect(() => {
    setSecurityKey(generateSecurityKey());
  }, []);

  const generateSecurityKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result.match(/.{1,4}/g).join('-');
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 6) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;
    if (password.match(/[$@#&!]+/)) strength += 25;
    return Math.min(100, strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const validateForm = () => {
    if (username.length < 3) {
      alert('Username must be at least 3 characters long.');
      return false;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, role, securityKey }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Signup successful:', data);
          alert('Account created successfully!');
          // Redirect to login page
          // In a real React app, you'd use React Router for navigation
          window.location.href = 'login.html';
        } else {
          let errorMessage = 'Failed to create account';
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
          }
          alert(`Error: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the account. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto bg-white rounded-lg shadow-md p-8 w-full max-w-4xl flex">
        <div className="w-1/2 pr-8">
          <h1 className="text-3xl font-bold mb-4">Create your Account</h1>
          <p className="mb-6 text-gray-600">Enter your details to get started</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="rounded-full h-2 transition-all duration-300 ease-out"
                  style={{
                    width: `${passwordStrength}%`,
                    backgroundColor:
                      passwordStrength < 25 ? '#ff4d4d' :
                      passwordStrength < 50 ? '#ffa64d' :
                      passwordStrength < 75 ? '#ffff4d' : '#4dff4d'
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Password strength: {
                  passwordStrength < 25 ? 'Weak' :
                  passwordStrength < 50 ? 'Moderate' :
                  passwordStrength < 75 ? 'Good' : 'Strong'
                }
              </p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Select your role:</p>
              {['user', 'admin', 'guest'].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value={option}
                    checked={role === option}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-radio text-blue-600"
                  />
                  <span className="capitalize">{option}</span>
                </label>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => window.location.href = 'login.html'}
                className="w-1/2 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Log In
              </button>
            </div>
          </form>
          <Alert className="mt-6">
            <Key className="h-4 w-4" />
            <AlertDescription>
              Your security key for password reset: <strong>{securityKey}</strong>
            </AlertDescription>
          </Alert>
        </div>
        <div className="w-1/2 pl-8 flex flex-col justify-center items-center text-center">
          <img src="/api/placeholder/100/100" alt="Logo" className="mb-6" />
          <h1 className="text-3xl font-bold mb-4">One account. All services.</h1>
          <p className="text-gray-600">Sign up for an account and get access to all our services.</p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;