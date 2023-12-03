import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <h1>Weight my plate</h1>
        </Link>
        <nav style={styles.nav}>
          {user && (
            <div style={styles.userContainer}>
              <span style={styles.userName}>{user.email}</span>
              <button style={styles.logoutButton} onClick={handleClick}>
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div style={styles.authLinks}>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/signup" style={styles.link}>
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: '#333',
    color: '#fff',
    padding: '10px 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
    color: '#fff',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    marginRight: '10px',
  },
  logoutButton: {
    padding: '8px 12px',
    background: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  authLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#fff',
  },
};

export default Navbar;
