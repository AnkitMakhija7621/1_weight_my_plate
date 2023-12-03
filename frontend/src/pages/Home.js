import { useEffect }from 'react'
import { useFoodsContext } from "../hooks/useFoodsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import FoodDetails from '../components/FoodDetails'
import FoodForm from '../components/FoodForm'

const Home = () => {
  const {foods, dispatch} = useFoodsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch('/api/foods', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchFoods()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="foods">
      <div><h2>History</h2></div>

        {foods && foods.map((food) => (
          <FoodDetails key={food._id} food={food} />
        ))}
      </div>
      <FoodForm />
    </div>
  )
}

export default Home