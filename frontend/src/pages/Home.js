import { useEffect } from 'react';
import { useFoodsContext } from '../hooks/useFoodsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import FoodDetails from '../components/FoodDetails';
import FoodForm from '../components/FoodForm';

const Home = () => {
  const { foods, dispatch } = useFoodsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch('/api/foods', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    if (user) {
      fetchFoods();
    }
  }, [dispatch, user]);

  return (
    <div className="home" style={styles.container}>
      <div className="foods" style={styles.foodsContainer}>
        <div>
          <h2 style={styles.heading}>History</h2>
        </div>

        {foods &&
          foods.map((food) => (
            <FoodDetails key={food._id} food={food} />
          ))}
      </div>
      <FoodForm />
    </div>
  );
};

const styles = {
  container: {
   
    padding: '50px',
    
    
    flexDirection: 'row', // Changed from 'column' to 'row'
    alignItems: 'flex-start', // Changed from 'center' to 'flex-start'
    justifyContent: 'space-between',
  },
  foodsContainer: {
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    flex: '1',
  },
  heading: {
    color: '#333',
    marginBottom: '15px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    textAlign: 'center',
    fontSize: '24px',
  },
};

export default Home;
