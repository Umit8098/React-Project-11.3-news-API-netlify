import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


// const API_KEY = import.meta.env.VITE_API_KEY;
// const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ category = "", search = "" }, thunkAPI) => {
    try {
      // Netlify Function'a istek
      let url = `/.netlify/functions/news?category=${category}&q=${search}`;


      const { data } = await axios.get(url);
      console.log("API Response:", data);

      // ✔ NewsAPI articles döner
      if (!data.articles) {
        return thunkAPI.rejectWithValue("API'den veri alınamadı.");
      }
      return data.articles;
    } catch (error) {
      return thunkAPI.rejectWithValue("Veri çekilirken hata oluştu");
    }
  }
);

const initialState = {
    newsList: [],
    loading : false, // API den veri çekilirken true, iş bittiğinde false olacak.
    error: null,
    category: 'general',
    search: '',
};


const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        // ✅ kategori güncelleme reducer
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
    },

    // 2) createAsyncThunk durumlarına göre state güncelleme
    extraReducers: (builder) => {
        builder
            // loading
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // success
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.newsList = action.payload;
                // Local Storage'a kaydet
                localStorage.setItem("newsList", JSON.stringify(action.payload));
            })
            // error
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Haberleri çekerken bir hata oluştu.";
            });
    }
});

export const { setCategory, setSearch } = newsSlice.actions;

export default newsSlice.reducer;
