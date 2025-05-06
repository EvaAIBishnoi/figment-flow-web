
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    // In a real app, we would call an API to authenticate
    // For demo purposes, we'll just navigate to the upload page
    navigate('/upload');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'stretch' 
    }}>
      <div style={{ 
        backgroundColor: '#0a2e81',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/9d/KPMG_logo.svg" 
          alt="KPMG Logo" 
          style={{ height: '30px' }} 
        />
      </div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px' 
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          backgroundColor: 'white'
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            textAlign: 'center', 
            marginBottom: '30px', 
            fontWeight: '600'
          }}>
            Sign In
          </h1>

          {error && (
            <div style={{
              backgroundColor: '#FFEBEE',
              color: '#D32F2F',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="email" 
                style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px' 
              }}>
                <label 
                  htmlFor="password" 
                  style={{ 
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Password
                </label>
                <a 
                  href="#" 
                  style={{ 
                    fontSize: '14px', 
                    color: '#0a2e81',
                    textDecoration: 'none'
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0a2e81',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              Sign In
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '14px' }}>
            <span style={{ color: '#718096' }}>Don't have an account? </span>
            <Link to="/sign-up" style={{ color: '#0a2e81', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        fontSize: '14px', 
        color: '#718096' 
      }}>
        Copyright 2025 KPMG. All Rights Reserved
      </div>
    </div>
  );
};

export default SignIn;
