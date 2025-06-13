/* eslint-disable no-undef */
import {
  Stack,
  TextField,
  Typography,
  Button,
  Menu,
  MenuItem,
  Select,
  Grid,
  FormControl,
  Radio,
  Paper,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Cart } from "../../cart/components/Cart";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressAsync,
  selectAddressStatus,
  selectAddresses,
} from "../../address/AddressSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectOrderStatus,
} from "../../order/OrderSlice";
import { resetCartByUserIdAsync, selectCartItems } from "../../cart/CartSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SHIPPING, TAXES, KEYID } from "../../../constants";
import { motion } from "framer-motion";
import axios from "axios";

export const Checkout = () => {
  const status = "";
  const addresses = useSelector(selectAddresses);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CASH");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const addressStatus = useSelector(selectAddressStatus);
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const orderStatus = useSelector(selectOrderStatus);
  const currentOrder = useSelector(selectCurrentOrder);
  const orderTotal = cartItems.reduce(
    (acc, item) => item.product.price * item.quantity + acc,
    0
  );
  let shippingCost = 0;
  if (orderTotal < 500) {
    shippingCost = SHIPPING;
  }
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  useEffect(() => {
    if (addressStatus === "fulfilled") {
      reset();
    } else if (addressStatus === "rejected") {
      alert("Error adding your address");
    }
  }, [addressStatus]);

  useEffect(() => {
    if (currentOrder && currentOrder?._id) {
      dispatch(resetCartByUserIdAsync(loggedInUser?._id));
      navigate(`/order-success/${currentOrder?._id}`);
    }
  }, [currentOrder]);

  const handleAddAddress = (data) => {
    const address = { ...data, user: loggedInUser._id };
    dispatch(addAddressAsync(address));
  };

  const handleCreateOrder = () => {
    const order = {
      user: loggedInUser._id,
      item: cartItems,
      address: selectedAddress,
      paymentMode: selectedPaymentMethod,
      total: (Math.floor((orderTotal + shippingCost) * 100) / 100).toFixed(2),
    };
    dispatch(createOrderAsync(order));
  };
  const handleCreateOrderWithPayment = async () => {
    const order = {
      user: loggedInUser._id,
      item: cartItems,
      address: selectedAddress,
      paymentMode: selectedPaymentMethod,
      total: (Math.floor((orderTotal + shippingCost) * 100) / 100).toFixed(2),
    };
    const { data } = await axios.post("/payment/process", {
      amount: order?.total,
    });

    console.log(data);
    console.log(KEYID);

    console.log(order);
    const options = {
      key: KEYID, // Replace with your Razorpay key_id
      amount: order?.total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "GrocerGenie",
      description: "Test Transaction",
      order_id: data.order.id, // This is the order_id created in the backend
      handler: async function (response) {
        console.log("Razorpay response:", response);

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response || {};

        if (!razorpay_payment_id) {
          alert("Payment response missing. Try again.");
          return;
        }

        try {
          const verifyRes = await axios.post("/payment/paymentVerification", {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          });

          if (verifyRes.data.success) {
            dispatch(createOrderAsync(order));
          } else {
            alert("Payment verification failed.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert("Error during payment verification.");
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9832399999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };
  return (
    <Stack
      flexDirection={"row"}
      p={2}
      rowGap={10}
      justifyContent={"center"}
      flexWrap={"wrap"}
      mb={"5rem"}
      mt={2}
      columnGap={4}
      alignItems={"flex-start"}
    >
      {/* left box */}
      <Stack rowGap={4}>
        {/* heading */}
        <Stack
          flexDirection={"row"}
          columnGap={is480 ? 0.3 : 1}
          alignItems={"center"}
        >
          <motion.div whileHover={{ x: -5 }}>
            <IconButton component={Link} to={"/cart"}>
              <ArrowBackIcon fontSize={is480 ? "medium" : "large"} />
            </IconButton>
          </motion.div>
          <Typography variant="h4">Shipping Information</Typography>
        </Stack>

        {/* address form */}
        <Stack
          component={"form"}
          noValidate
          rowGap={2}
          onSubmit={handleSubmit(handleAddAddress)}
        >
          <Stack>
            <Typography gutterBottom>Name</Typography>
            <TextField
              placeholder="Enter Your name"
              {...register("name", { required: true })}
            />
          </Stack>
          <Stack>
            <Typography gutterBottom>Phone Number</Typography>
            <TextField
              type="number"
              {...register("phoneNumber", { required: true })}
            />
          </Stack>
          <Stack flexDirection={"row"}>
            <Stack width={"100%"} marginRight={2}>
              <Typography gutterBottom>City</Typography>
              <TextField {...register("city", { required: true })} />
            </Stack>
            <Stack width={"100%"} marginRight={2}>
              <Typography gutterBottom>State</Typography>
              <TextField {...register("state", { required: true })} />
            </Stack>
            <Stack width={"100%"}>
              <Typography gutterBottom>Postal Code</Typography>
              <TextField
                type="number"
                {...register("postalCode", { required: true })}
              />
            </Stack>
          </Stack>
          <Stack>
            <Typography gutterBottom>Address</Typography>
            <TextField {...register("street", { required: true })} />
          </Stack>

          <Stack flexDirection={"row"} alignSelf={"flex-end"} columnGap={1}>
            <Button
              loading={status === "pending"}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
            <Button color="error" variant="outlined" onClick={() => reset()}>
              Reset
            </Button>
          </Stack>
        </Stack>

        {/* existing address */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6">Address</Typography>
            <Typography variant="body2" color={"text.secondary"}>
              Choose from existing Addresses
            </Typography>
          </Stack>

          <Grid
            container
            gap={2}
            width={is900 ? "auto" : "50rem"}
            justifyContent={"flex-start"}
            alignContent={"flex-start"}
          >
            {addresses.map((address, index) => (
              <FormControl item>
                <Stack
                  key={address._id}
                  p={is480 ? 2 : 2}
                  width={is480 ? "100%" : "20rem"}
                  height={is480 ? "auto" : "15rem"}
                  rowGap={2}
                  component={is480 ? Paper : Paper}
                  elevation={1}
                >
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <Radio
                      checked={selectedAddress === address}
                      name="addressRadioGroup"
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(addresses[index])}
                    />
                    <Typography>{address.name}</Typography>
                  </Stack>

                  {/* details */}
                  <Stack>
                    <Typography>{address.street}</Typography>
                    <Typography>
                      {address.city},{address.state}, {address.postalCode}
                    </Typography>
                    <Typography>{address.phoneNumber}</Typography>
                  </Stack>
                </Stack>
              </FormControl>
            ))}
          </Grid>
        </Stack>

        {/* payment methods */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6">Payment Methods</Typography>
            <Typography variant="body2" color={"text.secondary"}>
              Please select a payment method
            </Typography>
          </Stack>

          <Stack rowGap={2}>
            <Stack
              flexDirection={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Radio
                value={selectedPaymentMethod}
                name="paymentMethod"
                checked={selectedPaymentMethod === "CASH"}
                onChange={() => setSelectedPaymentMethod("CASH")}
              />
              <Typography>Cash on Delivery</Typography>
            </Stack>

            <Stack
              flexDirection={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Radio
                value={selectedPaymentMethod}
                name="paymentMethod"
                checked={selectedPaymentMethod === "CARD"}
                onChange={() => setSelectedPaymentMethod("CARD")}
              />
              <Typography>Online Payment</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* right box */}
      <Stack
        width={is900 ? "100%" : "auto"}
        alignItems={is900 ? "flex-start" : ""}
      >
        <Typography variant="h4">Order summary</Typography>
        <Cart checkout={true} />
        {selectedPaymentMethod === "CASH" ? (
          <Button
            fullWidth
            loading={orderStatus === "pending"}
            variant="contained"
            onClick={handleCreateOrder}
            size="large"
          >
            Place Order
          </Button>
        ) : (
          <Button
            fullWidth
            loading={orderStatus === "pending"}
            variant="contained"
            onClick={handleCreateOrderWithPayment}
            size="large"
          >
            Pay and order
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
