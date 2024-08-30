import HomeItem from "../components/HomeItem";
import { useSelector } from "react-redux";
import AddItem from "../components/Model";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState, useEffect } from "react";

const Home = () => {
  const items = useSelector((store) => store.items);
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const [searchVal, setSearchVal] = useState("");
  const [products, setProducts] = useState(items);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchVal(searchValue);

    if (searchValue === "") {
      setProducts(items);
      return;
    }

    const filterBySearch = items.filter((product) => {
      return (
        product &&
        product.productName &&
        typeof product.productName === "string" &&
        product.productName.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setProducts(filterBySearch);
  };
  return (
    <>
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
              <div className=" lg:mt-0 lg:ml-3">
                <AddItem />
              </div>
            </div>
          </div>
          <hr className="my-2" />
        </div>

        {products.length === 0 ? (
          <div className="flex items-center justify-center py-4">
            {fetchStatus.currentlyFetching ? (
              <LoadingSpinner />
            ) : (
              <p>No products found</p>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {products.map((item) => (
              <HomeItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
