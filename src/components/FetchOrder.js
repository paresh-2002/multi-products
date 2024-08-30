import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { db } from '../FirebaseConfig';
import { get, ref } from 'firebase/database';
import { OrderActions } from '../store/orderSlice';

const FetchOrder = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOrders = () => {
      const ordersRef = ref(db, 'orders');
      get(ordersRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const orders = Object.values(data);
            // console.log('Fetched orders:', orders);
            dispatch(OrderActions.setOrders(orders))
          } else {
            console.warn('Fetched data is empty.');
          }
        })
        .catch((error) => {
          console.error('Error fetching orders:', error.message);
        });
    };
    fetchOrders();
  }, [dispatch]);

  return (
    null
  )
}

export default FetchOrder