import { useDispatch, useSelector } from "react-redux";
import { OrderActions } from "../store/orderSlice";
import { toast } from "react-toastify";
import { ref, remove, set } from "firebase/database";
import { db } from "../FirebaseConfig";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import AddItemModel from "./Model";

const HomeItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  const order = useSelector((store) => store.order);
  const isInOrder = order.includes(item.id);
  const handleAddToOrder = async () => {
    try {
      dispatch(OrderActions.addToOrder(item.id));
      await set(ref(db, `orders/${item.id}`), item.id);
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`);
      console.error(`Error adding product: ${error.message}`);
    }
  };
  const handleRemoveItem = async () => {
    try {
      dispatch(OrderActions.removeFromOrder(item.id));
      const dbRef = ref(db, `orders/${item.id}`);
      await remove(dbRef);
      toast.success('Product removed successfully!');
    } catch (error) {
      dispatch(OrderActions.addToOrder(item.id));
      toast.error(`Error removing product: ${error.message}`);
      console.error('Error removing product:', error.message);
    }
  };
  const handleEdit = () => {
    setCurrentItem(item);
    setIsOpen(true);
  };
  return (
    <div className="card w-[18rem]">
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
      <div className="flex justify-between items-center m-2 gap-2">
        <button
          className={`btn w-full ${isInOrder ? 'btn-danger' : 'btn-primary'}`}
          onClick={isInOrder ? handleRemoveItem : handleAddToOrder}
        >
          {isInOrder ? 'Remove' : 'Order Now'}
        </button>
        <div>
          <AddItemModel
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            item={currentItem}
          />
          <button
            type="button"
            className="btn btn-success py-2 cursor-pointer"
            onClick={handleEdit}
          >
            <MdEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeItem;
