import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusActions } from "../store/fetchStatusSlice";
import { itemsActions } from "../store/itemsSlice";
import { db } from "../FirebaseConfig";
import { ref, get } from "firebase/database";

const Fetchitems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;
    const fetchData = async () => {
      dispatch(fetchStatusActions.markFetchingStarted());

      try {
        const dbRef = ref(db, "products/");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          dispatch(itemsActions.addInitialItems(data));
          dispatch(fetchStatusActions.markFetchDone());
        } else {
          console.error("Fetched data is empty.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(fetchStatusActions.markFetchingFailed());
      } finally {
        dispatch(fetchStatusActions.markFetchingFinished());
      }
    };

    fetchData();
  }, [fetchStatus, dispatch]);

  return null;
};

export default Fetchitems;
