import { useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { OrderActions } from "../store/orderSlice";
import { toast } from "react-toastify";
import { db } from "../FirebaseConfig";
import { ref, remove } from "firebase/database";

const OrderItems = ({ item }) => {
  const dispatch = useDispatch();
   

  const handleRemoveItem = async () => {
    dispatch(OrderActions.removeFromOrder(item.id));
    const dbRef = ref(db, `orders/${item.id}`);
    await remove(dbRef);
    toast.success("Product removed Successfully");
    //window.location.reload();
    };

  return (
    <div className="text-sm border rounded relative mb-2 pt-3 pb-0 px-3 border-solid border-[#eaeaec];
  background: #fff">
      <div className="absolute h-[148px] w-[111px] background: rgb(255, 242, 223)">
      <img className="card-img-top" src={item.productImg} alt={item.productName} />
      </div>
      <div className=" relative min-h-[148px] ml-[111px] mb-3 pl-3">
        <div className="text-[#1a1b20] text-2xl leading-none overflow-hidden text-ellipsis whitespace-nowrap font-normal block my-0">{item.productName}</div>
        <div className="price-container">
          <span className="text-xl font-bold text-[#282c3f]">Rs {item.productPrice}</span>
        </div>
      </div>

      <div className="absolute text-[25px] w-3.5 h-3.5 cursor-pointer right-[18px] top-2.5" onClick={handleRemoveItem}>
        <RiDeleteBin5Fill />
      </div>
    </div>
  );
};
export default OrderItems;