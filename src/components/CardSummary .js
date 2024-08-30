import React from "react";
import { useSelector } from "react-redux";

const CardSummary = () => {
  const cardItemIds = useSelector((state) => state.order);
  const items = useSelector((state) => state.items);
  const finalItems = items.filter((item) => {
    const itemIndex = cardItemIds.indexOf(item.id);
    return itemIndex >= 0;
  });

  const CONVENIENCE_FEES = 99;
  let totalItem = cardItemIds.length;
  let totalMRP = 0;

  finalItems.forEach((orderItem) => {
    totalMRP += orderItem.productPrice;
  });

  let finalPayment = totalMRP + CONVENIENCE_FEES;
  return (
    <div className="align-top inline-block w-full  text-[#282c3f] text-[13px] leading-[1.42857143] pl-4 pr-0 pt-6 pb-0">
      <div className="mb-[16px]">
        <div className="text-xs font-bold text-[#535766] mt-6 mb-4 mx-0">
          PRICE DETAILS ({totalItem} Items){" "}
        </div>
        <div className="leading-4 text-sm text-[#282c3f] mb-3">
          <span className="price-item-tag">Total MRP</span>
          <span className="float-right">₹{totalMRP}</span>
        </div>

        <div className="leading-4 text-sm text-[#282c3f] mb-3">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="float-right">₹{CONVENIENCE_FEES}</span>
        </div>
        <hr />
        <div className="font-bold text-[15px] text-[#3e4152] leading-4 pt-4 border-t-[#eaeaec] border-t border-solid">
          <span className="price-item-tag">Total Amount</span>
          <span className="float-right">₹{finalPayment}</span>
        </div>
      </div>
      <button className="w-full tracking-[1px] text-sm rounded-md font-semibold bg-[rgb(255,63,108)] text-white cursor-pointer px-4 py-2.5 border-0">
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
};

export default CardSummary;
