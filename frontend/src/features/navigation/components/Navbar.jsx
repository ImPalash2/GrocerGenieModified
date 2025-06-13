import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Chip,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../user/UserSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { selectCartItems } from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TuneIcon from "@mui/icons-material/Tune";
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";
import logo from "./../../../assets/images/logo.png";
import Searchbar from "./Searchbar";

export const Navbar = ({ isProductList = false, onSearch }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const is900 = useMediaQuery(theme.breakpoints.down(900));

  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const settings = [
    { id: 1, name: "Home", to: "/" },
    {
      id: 2,
      name: "Profile",
      to: loggedInUser?.isAdmin ? "/admin/profile" : "/profile",
    },
    {
      id: 3,
      name: loggedInUser?.isAdmin ? "Orders" : "My orders",
      to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders",
    },
    { id: 4, name: "Logout", to: "/logout" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(to bottom,#ECDDFF, #ffffff)",
        boxShadow: "none",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{
          padding: 1,
          px: 2,
          height: "5.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* for logo*/}
        <Box
          component="a"
          href="/"
          sx={{
            mt: "-12px",
            mr: 2,
            ml: "1rem",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: "3.5rem",
              display: "block",
            }}
          />
        </Box>
        {!is900 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: "20vw",
              marginLeft: "2vw",
            }}
          >
            <Typography
              variant="h5" // or "h4" depending on size preference
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: "1.2rem",
                color: "#333", // Dark color for readability
                letterSpacing: "0.5px",
              }}
            >
              Delivery in <span style={{ color: "#EF4372" }}>15 Mins</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "#757575", // Lighter color for the address
                maxWidth: "85%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              123 Main Street, Apt 45, New York, NY
            </Typography>
          </Box>
        ) : (
          ""
        )}
        {!is900 ? <Searchbar onSearch={onSearch} /> : ""}
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={is900 ? "space-between" : "flex-end"}
          columnGap={2}
          width={"100%"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo?.name} src="null" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {loggedInUser?.isAdmin && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    component={Link}
                    color={"text.primary"}
                    sx={{ textDecoration: "none" }}
                    to="/admin/add-product"
                    textAlign="center"
                  >
                    Add new Product
                  </Typography>
                </MenuItem>
              )}
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Typography
                    component={Link}
                    color={"text.primary"}
                    sx={{ textDecoration: "none" }}
                    to={setting.to}
                    textAlign="center"
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h6" fontWeight={300} sx={{ ml: "10px" }}>
              {is480 ? `${userInfo?.name.toString().split(" ")[0]}` : ""}
            </Typography>
            {loggedInUser.isAdmin && <Button variant="contained">Admin</Button>}
          </Box>
          <Stack
            sx={{
              flexDirection: "row",
              columnGap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cartItems?.length >= 0 && (
              <Badge badgeContent={cartItems.length} color="error">
                <IconButton onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {!loggedInUser?.isAdmin && (
              <Stack>
                <Badge badgeContent={wishlistItems?.length} color="error">
                  <IconButton component={Link} to={"/wishlist"}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Badge>
              </Stack>
            )}
            {isProductList && (
              <IconButton onClick={handleToggleFilters}>
                <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "" }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
