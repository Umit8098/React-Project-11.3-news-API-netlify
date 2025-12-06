import { AppBar, Toolbar, Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, Modal } from "@mui/material";
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
  const [openSearch, setOpenSearch] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);


  return (
      <AppBar 
          position="sticky" 
          color="default" 
          sx={{ p: 1, backgroundColor: mode === "light" ? "#f0f0f0" : "#333" }}
      >
        <Toolbar sx={{ 
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
          }}
        >
            {/* Logo */}
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              NEWS
            </Typography>

            {/* Mobil */}
            <Box sx={{ display: { xs: "flex", sm: "none" }, gap: 1 }}>
              <Button 
                variant="contained" 
                size="small"
                onClick={() => setOpenCategory(true)}
              >
                Kategori
              </Button>
            
              <Button 
                variant="contained" 
                size="small"
                onClick={() => setOpenSearch(true)}
              >
                Ara
              </Button>
            </Box>

            {/* Desktop */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, flex: 1, ml: 3 }}>
              
              <FormControl sx={{ width: 200 }}>
                <InputLabel id="category-label">Kategori</InputLabel>
                <Select
                  labelId="category-label"
                  label="Kategori"
                  value={category}
                  onChange={(e) => {
                    dispatch(setCategory(e.target.value));
                    dispatch(setSearch(""));
                    setLocalSearch("");
                  }}
                >
                  {categories.map(ctg => (
                    <MenuItem key={ctg} value={ctg}>{ctg}</MenuItem>
                  ))}
                </Select>
              </FormControl>
                
              <TextField
                label="Ara..."
                variant="outlined"
                size="small"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(setSearch(localSearch));
                  }
                }}
                sx={{ width: 200 }}
              />
            </Box>


            {/* Tema */}
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </Toolbar>

        {/* CATEGORY MODAL */}
        <Modal open={openCategory} onClose={() => setOpenCategory(false)}>
          <Box sx={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 260, bgcolor: "background.paper",
            p: 3, borderRadius: 2
          }}>
            <Typography variant="h6" mb={2}>Kategori Seç</Typography>

            <FormControl fullWidth>
              <Select
                value={category}
                onChange={(e) => {
                  dispatch(setCategory(e.target.value));
                  dispatch(setSearch(""));
                  setOpenCategory(false);
                }}
              >
                {categories.map(ctg => (
                  <MenuItem key={ctg} value={ctg}>{ctg}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Modal>

        {/* SEARCH MODAL */}
        <Modal open={openSearch} onClose={() => setOpenSearch(false)}>
          <Box sx={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 260, bgcolor: "background.paper",
            p: 3, borderRadius: 2
          }}>
            <Typography variant="h6" mb={2}>Haber Ara</Typography>

            <TextField
              fullWidth
              label="Kelime..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(setSearch(localSearch));
                  setOpenSearch(false);
                }
              }}
            />
          </Box>
        </Modal>

      </AppBar>
  );
};

export default Header;
