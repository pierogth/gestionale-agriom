import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { data } from 'autoprefixer';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 5,
  },
  reducers: {
    incremented: state => {
      state.count += 1;
    },
    decremented: state => {
      state.count -= 1;
    },
  },
});

export const fetchMenu = createAsyncThunk('', async role_id => {
  const menu = await axios.get(`/api/user/profile/${role_id}`);
  return menu.data;
});

const initialState = {
  name: 'menu',
  status: 'idle',
  error: null,
  selectdRole: null,
  menu: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.selectdRole = action.payload;
    },
    setInitialState: state => {
      let localStorageMenu = localStorage.getItem('menu');
      if (localStorageMenu) {
        let data = JSON.parse(localStorageMenu);
        state.selectdRole = data.selectdRole;
        state.menu = data.menu;
      } else {
        state.menu = initialState.menu;
        state.status = initialState.status;
        state.selectdRole = initialState.selectdRole;
        state.name = initialState.name;
        state.error = initialState.error;
        localStorage.setItem('menu', JSON.stringify(state));
      }
    },
  },

  extraReducers: (builder: any) => {
    builder
      .addCase(fetchMenu.fulfilled, (state: any, action: any) => {
        state.status = 'succeeded';
        state.menu = action.payload;
        localStorage.setItem('menu', JSON.stringify(state));
      })
      .addCase(fetchMenu.pending, (state: any) => {
        state.status = 'loading';
        state.menu = [];
      })
      .addCase(fetchMenu.rejected, (state: any, action: any) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedRole, setInitialState } = menuSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    menu: menuSlice.reducer,
  },
});
