import React, { useEffect } from "react";
// import { ProductList } from "../features/products/components/ProductList";
import {
  resetAddressStatus,
  selectAddressStatus,
} from "../features/address/AddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../features/footer/Footer";
import Home from "../features/navigation/components/Home";

export const HomePage = () => {
  const dispatch = useDispatch();
  const addressStatus = useSelector(selectAddressStatus);

  useEffect(() => {
    if (addressStatus === "fulfilled") {
      dispatch(resetAddressStatus());
    }
  }, [addressStatus]);

  return (
    <>
      <Home isProductList={true} />
      {/* <ProductList /> */}
      <Footer />
    </>
  );
};
