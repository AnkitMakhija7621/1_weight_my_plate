import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container" style={styles.container}>
      <form className="login" onSubmit={handleSubmit}>
        <h3 style={styles.title}>Log In</h3>

        <label style={styles.label}>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={styles.input}
        />
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          style={styles.input}
        />

        <button style={styles.button} disabled={isLoading}>
          Log in
        </button>
        {error && <div className="error" style={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

const styles = {
  container: {
   
   
    
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
     
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: '#ff4d4f',
    marginTop: '10px',
  },
};

export default Login;
