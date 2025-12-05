import { AppBar, Toolbar, Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSearch } from "../features/newsSlice";

import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { toggleTheme } from "../features/themeSlice";
import { useState } from "react";

const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

const Header = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.news);
  const mode = useSelector((state) => state.theme.mode);

  // 🔥 Search input için local state
  const [localSearch, setLocalSearch] = useState(""); // 🔥 local state


  return (
    <AppBar 
        position="sticky" 
        color="default" 
        sx={{ p: 1, backgroundColor: mode === "light" ? "#f0f0f0" : "#333" }}
    >
      <Toolbar sx={{ 
        display: "flex",
        flexWrap: { xs: "wrap", md: "nowrap" }, // 🔥 xs-sm: 2 satır, md+: tek satır
        gap: 2, 
        alignItems: "center" }}
        >
          {/* Logo */}
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            NEWS
          </Typography>

          {/* Category +Search alanlarını grupla */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",              // 🔥 Küçük ekranda otomatik alt satır
              gap: 2,
              flex: 1,
              alignItems: "center",
            }}
          >
            {/* Category Select */}
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="category-label">Kategori</InputLabel>
              <Select
                labelId="category-label"
                label="Kategori"
                value={category}
                // onChange={(e) => dispatch(setCategory(e.target.value))}
                onChange={(e) => {
                  const newCategory = e.target.value;
                  dispatch(setCategory(newCategory));
                  dispatch(setSearch(""));        // 🔥 category değişince search sıfırla
                  setLocalSearch("");             // 🔥 input alanını da temizle
                }}
              >
                {categories.map((ctg) => (
                  <MenuItem key={ctg} value={ctg}>{ctg}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Search */}
            <TextField
              label="Ara..."
              variant="outlined"
              size="small"
              // value={search}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)} // local state kaydediyoruz
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(setSearch(localSearch)); // Enter’a basınca Redux state güncellensin
                }
              }}
              sx={{ minWidth: 200 }}
            />
          </Box>

            {/* Tema Değiştirme Butonu */}
            <IconButton 
                color="inherit" 
                sx={{ ml: "auto"}} //🔥 burası en sağa yasladı
                onClick={() => dispatch(toggleTheme())}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
