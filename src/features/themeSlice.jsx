import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("mode") || "light", // Varsayılan tema 'light'
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Tema değiştirme reducer'ı
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      // Temayı Local Storage'a kaydet
      localStorage.setItem("mode", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;