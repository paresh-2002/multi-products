import { useDispatch, useSelector } from "react-redux";
import { OrderActions } from "../store/orderSlice";
import { toast } from "react-toastify";
import { ref, remove, set } from "firebase/database";
import { db } from "../FirebaseConfig";

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const orderItems = useSelector((store) => store.order);
  const elementFound = orderItems.indexOf(item.id) >= 0;

  const handleAddToOrder = async () => {
    try {
      dispatch(OrderActions.addToOrder(item.id));
      await set(ref(db, `orders/${item.id}`), item);
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`);
    }
  };

  const handleRemoveItem = async () => {
    dispatch(OrderActions.removeFromOrder(item.id));
    const dbRef = ref(db, `orders/${item.id}`);
    await remove(dbRef);
    toast.success("Product removed Successfully");
    //window.location.reload();
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
      {!elementFound ? (
        <button className="btn btn-primary m-2" onClick={handleAddToOrder}>
          Order Now
        </button>
      ) : (
        <button className="btn btn-danger m-2" onClick={handleRemoveItem}>
          Remove
        </button>
      )}
    </div>
  );
};

export default HomeItem;
