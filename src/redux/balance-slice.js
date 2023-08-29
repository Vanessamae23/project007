import { createSlice } from '@reduxjs/toolkit';

export const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        value: 0,
    },
    reducers: {
        setBalance: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { topupBalance, setBalance } = balanceSlice.actions;

export default balanceSlice.reducer;