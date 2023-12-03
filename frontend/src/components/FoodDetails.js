import { useFoodsContext } from '../hooks/useFoodsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const FoodDetails = ({ food }) => {
  const { dispatch } = useFoodsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/foods/' + food._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="food-details">
      
      <h4>{food.title}</h4>
      <p><strong>Weight (kg): </strong>{food.load}</p>
      <p><strong>Calories: </strong>{food.reps}</p>
      <p>{formatDistanceToNow(new Date(food.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default FoodDetails