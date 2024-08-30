import { useDispatch, useSelector } from "react-redux";
import { OrderActions } from "../store/orderSlice";
import { toast } from "react-toastify";
import { ref, set } from "firebase/database";
import { db } from "../FirebaseConfig";

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const order = useSelector((store) => store.order);
  const isInOrder = order.includes(item.id);
  const handleAddToOrder = async () => {
    try {
      // dispatch(OrderActions.addToOrder(item.id));
      await set(ref(db, `orders/${item.id}`), item);
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`);
      console.error(`Error adding product: ${error.message}`);
    }
  };

  return (
    <div className="card w-[18rem] ">
      <div className="h-[70%]">
        <img
          className="card-img-top"
          src={item.productImg}
          alt={item.productName}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{item.productName}</h5>
        <p className="m-0">₹{item.productPrice}</p>
      </div>
      <button
        className={`btn m-2 ${isInOrder ? 'btn-danger' : 'btn-primary'}`}
        onClick={handleAddToOrder}
      >
       Order Now
      </button>
    </div>
  );
};

export default HomeItem;
