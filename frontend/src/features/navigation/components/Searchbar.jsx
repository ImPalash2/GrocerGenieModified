import { Box, InputAdornment, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
const products = [
  "Apples",
  "Bananas",
  "Paneer",
  "Aashirvaad Atta",
  "Lays Chips",
  "Mangoes",
  "Toothpaste",
  "Detergent",
  "Amul Butter",
];

const Searchbar = ({ onSearch }) => {
  const [focused, setFocused] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState(products[0]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    setCurrentText(products[index]);
  }, [index]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && onSearch && searchValue.trim() !== "") {
      onSearch(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const showPlaceholder = !focused && searchValue === "";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        ml: 2,
        mr: 2,
        position: "relative",
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        value={searchValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          transition: "width 0.3s ease-in-out",
          width: focused ? "35vw" : "26vw",
          "& .MuiOutlinedInput-root": {
            paddingRight: 0,
            borderRadius: 2,
            boxShadow: "inset 0 0 2px rgba(0, 0, 0, 0.3)",
            "& fieldset": {
              border: "none",
            },
            "&:hover": {
              boxShadow: "inset 0 0 2px rgba(0, 0, 0, 0.3)",
            },
            "&.Mui-focused": {
              boxShadow: "inset 0 0 2px rgba(0, 0, 0, 0.3)",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#BDBDBD" }} />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end" sx={{ mr: 1 }}>
              <IconButton onClick={handleClear} edge="end" size="small">
                <CloseIcon sx={{ color: "#BDBDBD" }} />
              </IconButton>
            </InputAdornment>
          ),
          sx: { height: "3rem" },
        }}
      />

      {/* Custom animated placeholder */}
      {showPlaceholder && (
        <Box
          sx={{
            position: "absolute",
            left: "3rem",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            color: "#9e9e9e",
            fontSize: "0.95rem",
            pointerEvents: "none",
            height: "1.2rem",
          }}
        >
          <span>Search for&nbsp;</span>
          <Box
            sx={{
              height: "1.2rem",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              key={currentText}
              sx={{
                animation: "scrollUp 3s ease-in-out",
                whiteSpace: "nowrap",
              }}
            >
              <span>&nbsp;&quot;{currentText}&quot;</span>
            </Box>
          </Box>
        </Box>
      )}

      {/* Keyframes inside a <style> tag */}
      <style>
        {`
          @keyframes scrollUp {
            0% {
              transform: translateY(100%);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            50% {
              transform: translateY(0%);
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100%);
              opacity: 0;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Searchbar;
