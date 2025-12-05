import { createSlice } from '@reduxjs/toolkit';

// Kullanıcıyı Local Storage’da Tutmak (Opsiyonel Ama Tavsiye), Sayfa yenileyince user uçmasın diye:
const persistedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: persistedUser || null,
  loading: true, // uygulama açıldığında auth durumunu kontrol etmek için..
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // Local Storage'a kaydet
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.loading = false; // user yüklendiğinde loading false yapılır..
        },
        clearUser: (state, action) => {
            state.user = null;
            // Local Storage'dan sil
            localStorage.removeItem("user");
            state.loading = false; // user çıkış yaptığında da loading false yapılır..
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
