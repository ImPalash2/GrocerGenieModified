import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Navbar } from "./Navbar";
import { ProductCard } from "../../products/components/ProductCard";
import { ProductList } from "../../products/components/ProductList";
import { emptyWishlistAnimation } from "../../../assets";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../products/ProductSlice";
import axios from "axios";
// import { useLocation } from "react-router-dom";

const Home = ({ isProductList }) => {
  const [filteredProducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickedForSearch, setClickedforSearch] = useState(false);
  const theme = useTheme();
  const is642 = useMediaQuery(theme.breakpoints.down(642));
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  // const products = useSelector(selectProducts);

  //   const location = useLocation(); // Get the current URL location

  //   // Reset search states when the URL changes (i.e., when the user presses the back button)
  //   useEffect(() => {
  //     setClickedforSearch(false); // Reset search state
  //     setFilterProducts([]); // Reset filtered products
  //   }, [location.pathname]);

  const handleSearch = async (searchValue) => {
    try {
      setLoading(true);
      const res = await axios.get(`/products/`);
      const products = res.data;
      console.log(products);
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterProducts(filteredProducts);
      console.log(filteredProducts);
      setClickedforSearch(true);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Navbar isProductList={isProductList} onSearch={handleSearch} />

      {/* Products */}
      {clickedForSearch ? (
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
          mt={4}
        >
          {loading ? (
            <Typography>Loading...</Typography>
          ) : filteredProducts?.length === 0 ? (
            <Stack
              minHeight={"60vh"}
              width={is642 ? "auto" : "40rem"}
              justifySelf={"center"}
              alignSelf={"center"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Lottie animationData={emptyWishlistAnimation} />
              <Typography variant="h6" fontWeight={300} marginBottom={"3rem"}>
                Oops!! No items found
              </Typography>
            </Stack>
          ) : (
            <Grid
              gap={is700 ? 1 : 2}
              container
              justifyContent={"center"}
              alignContent={"center"}
            >
              {filteredProducts?.map((product) => (
                <ProductCard
                  key={product?._id}
                  id={product?._id}
                  title={product?.title}
                  price={product?.price}
                  thumbnail={product?.thumbnail}
                  brand={product?.brand?.name}
                  stockQuantity={product?.stockQuantity}
                />
              ))}
            </Grid>
          )}
        </Stack>
      ) : (
        <ProductList />
      )}
    </Box>
  );
};

export default Home;
