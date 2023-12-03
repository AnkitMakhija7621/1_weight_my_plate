import { useState } from "react";
import { useFoodsContext } from "../hooks/useFoodsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const FoodForm = () => {
  const filepath = '/Users/amankhurana/Desktop/ssdA-4/';
  const { dispatch } = useFoodsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    try {
      const response = await fetch('/api/foods', {
        method: 'POST',
        body: JSON.stringify({
          image: image
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
      if (response.ok) {
        setTitle('');
        setLoad('');
        setReps('');
        setError(null);
        setEmptyFields([]);
        dispatch({ type: 'CREATE_WORKOUT', payload: json });
      }
    } catch (error) {
      console.log("error\n")
      console.log(error.message);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.heading}>Add new meal</h3>

      <label style={styles.label}>Upload Image:</label>
      <input
        type="file"
        onChange={(e) => {
          var arr = e.target.value.split("\\");
          const fileurl = filepath + arr[arr.length-1];
          setImage(fileurl);
        }}
      />

      <button style={styles.button}>Upload</button><br></br>

      {error && <div className="error" style={styles.error}>{error}</div>}
    </form>
  );
}

const styles = {
  form: {
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
  },
  heading: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
  },
  button: {
    padding: '10px',
    background: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    color: '#f44336',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default FoodForm;
