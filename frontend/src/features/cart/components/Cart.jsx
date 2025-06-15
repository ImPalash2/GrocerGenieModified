import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import {
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  resetCartItemRemoveStatus,
  selectCartItemRemoveStatus,
  selectCartItems,
} from "../CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SHIPPING, TAXES } from "../../../constants";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const Cart = ({ checkout }) => {
  const items = useSelector(selectCartItems);
  const subtotal = Number(
    Math.floor(
      items.reduce((acc, item) => item.product.price * item.quantity + acc, 0) *
        100
    ) / 100
  ).toFixed(2);
  let shippingCost = 0;
  if (subtotal < 500) {
    shippingCost = Number(SHIPPING);
  }
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));

  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items]);

  useEffect(() => {
    if (cartItemRemoveStatus === "fulfilled") {
      toast.success("Product removed from cart");
    } else if (cartItemRemoveStatus === "rejected") {
      toast.error("Error removing product from cart, please try again later");
    }
  }, [cartItemRemoveStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetCartItemRemoveStatus());
    };
  }, []);

  return (
    <Stack justifyContent={"flex-start"} alignItems={"center"} mb={"5rem"}>
      <Stack
        width={is900 ? "auto" : "50rem"}
        mt={"3rem"}
        paddingLeft={checkout ? 0 : 2}
        paddingRight={checkout ? 0 : 2}
        rowGap={4}
      >
        {/* cart items */}
        <Stack rowGap={5}>
          {items &&
            items.map((item) => (
              <CartItem
                key={item?._id}
                id={item?._id}
                title={item?.product?.title}
                brand={item?.product?.brand?.name}
                category={item?.product?.category?.name}
                price={item?.product?.price}
                quantity={item?.quantity}
                thumbnail={item?.product?.thumbnail}
                stockQuantity={item?.product?.stockQuantity}
                productId={item?.product?._id}
              />
            ))}
        </Stack>

        {/* subtotal */}
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {checkout ? (
            <Stack rowGap={2} width={"100%"}>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Subtotal</Typography>
                <Typography>₹{subtotal}</Typography>
              </Stack>

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Shipping</Typography>
                <Typography>₹{shippingCost}</Typography>
              </Stack>

              {/* <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Taxes</Typography>
                <Typography>₹{TAXES}</Typography>
              </Stack> */}

              <hr />

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Total</Typography>
                <Typography>
                  ₹
                  {Math.floor(
                    ((Number(subtotal) + Number(shippingCost)) * 100) / 100
                  ).toFixed(2)}
                </Typography>
              </Stack>
            </Stack>
          ) : (
            <>
              <Stack>
                <Typography variant="h6" fontWeight={500}>
                  Subtotal
                </Typography>
                <Typography>Total items in cart {totalItems}</Typography>
                <Typography variant="body1" color={"text.secondary"}>
                  Shipping and taxes will be calculated at checkout.
                </Typography>
              </Stack>

              <Stack>
                <Typography variant="h6" fontWeight={500}>
                  &#x20B9;{subtotal}
                </Typography>
              </Stack>
            </>
          )}
        </Stack>

        {/* checkout or continue shopping */}
        {!checkout && (
          <Stack rowGap={"1rem"}>
            <Button variant="contained" component={Link} to="/checkout">
              Checkout
            </Button>
            <motion.div style={{ alignSelf: "center" }} whileHover={{ y: 2 }}>
              <Chip
                sx={{ cursor: "pointer", borderRadius: "8px" }}
                component={Link}
                to={"/"}
                label="or continue shopping"
                variant="outlined"
              />
            </motion.div>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
