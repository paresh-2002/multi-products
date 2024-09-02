import HomeItem from "../components/HomeItem";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";
import AddItemModel from "../components/Model";
import { MdAddBox } from "react-icons/md";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const items = useSelector((store) => store.items);
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const [searchVal, setSearchVal] = useState("");

  // Filter items based on search value directly
  const filteredProducts = items.filter((product) =>
    product?.productName?.toLowerCase().includes(searchVal.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="sticky top-[92px] z-10 bg-white">
        <div className="flex flex-col lg:flex-row justify-between items-center m-2">
          <h2 className="text-2xl font-semibold mb-2 lg:mb-0">PRODUCTS</h2>
          <div className="flex lg:flex-row items-center w-full lg:w-auto">
            <div
              className="lg:mb-0 lg:mr-3 flex-grow lg:flex-grow-0"
              role="search"
            >
              <input
                type="search"
                className="form-control form-control-dark w-full lg:w-48 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Search..."
                aria-label="Search"
                value={searchVal}
                onChange={handleSearch}
              />
            </div>
            <div className="lg:mt-0 lg:ml-3">
            <AddItemModel isOpen={isOpen} setIsOpen={setIsOpen} />
          <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={openModal}
        >
          <MdAddBox />
        </button>
            </div>
          </div>
        </div>
        <hr className="my-2" />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex items-center justify-center py-4">
          {fetchStatus.currentlyFetching ? (
            <LoadingSpinner />
          ) : (
            <p>No products found</p>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          {filteredProducts.map((item) => (
            <HomeItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
