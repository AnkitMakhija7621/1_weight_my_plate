import { useFoodsContext } from '../hooks/useFoodsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const FoodDetails = ({ food }) => {
  const { dispatch } = useFoodsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/foods/' + food._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="food-details" style={styles.container}>
      <h4 style={styles.title}>{food.title}</h4>
      <p style={styles.detail}><strong>Weight (kg): </strong>{food.load}</p>
      <p style={styles.detail}><strong>Calories: </strong>{food.reps}</p>
      <p style={styles.detail}>{formatDistanceToNow(new Date(food.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" style={styles.deleteIcon} onClick={handleClick}>delete</span>
    </div>
  );
};

const styles = {
  container: {
    background: '#f8f8f8',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s ease',
    ':hover': {
      background: '#eaeaea',
    },
  },
  title: {
    color: '#333',
    marginBottom: '10px',
    fontSize: '18px',
  },
  detail: {
    marginBottom: '5px',
    color: '#555',
  },
  deleteIcon: {
    color: '#e57373',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#f44336',
    },
  },
};

export default FoodDetails;
