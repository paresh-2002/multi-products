import { useSelector } from "react-redux";
import CardSummary from "../components/CardSummary";
import OrderItems from "../components/OrderItems";
import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import debounce from "lodash.debounce"; // You'll need to install lodash.debounce

const Card = () => {
  const items = useSelector((store) => store.items);
  const order = useSelector((store) => store.order);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(true);

  const finalItems = useMemo(
    () => items.filter((item) => order.includes(item.id)),
    [items, order]
  );

  const handleSearch = debounce((value) => {
    setSearchVal(value);
  }, 300);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    if (searchVal === "") {
      return finalItems;
    }
    return finalItems.filter((product) =>
      product.productName.toLowerCase().includes(searchVal.toLowerCase())
    );
  }, [searchVal, finalItems]);

  return (
    <main className="container mx-auto px-4">
      <div className="max-w-full">
        <div className="top-[92px] sticky z-10 bg-white">
          <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
            <h2 className="text-2xl font-semibold">PRODUCTS</h2>
            <div className="flex items-center">
              <div
                className="col-12 col-lg-auto mb-3 mb-lg-0 flex items-center"
                role="search"
              >
                <input
                  type="search"
                  className="form-control form-control-dark"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchVal}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="flex flex-col lg:flex-row mt-4">
          <div className="flex-1 lg:mr-4 text-gray-800 text-sm leading-relaxed pr-5 pt-8 border-b lg:border-b-0 lg:border-r border-gray-200 lg:pb-8">
            {loading ? (
              <LoadingSpinner />
            ) : filteredItems.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Product Not Found</p>
              </div>
            ) : (
              filteredItems.map((item) => <OrderItems key={item.id} item={item} />)
            )}
          </div>
          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <CardSummary />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Card;
