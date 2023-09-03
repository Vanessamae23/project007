import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        fullName: '',
        photoUrl: null,
        phoneNumber: 'Not set yet',
        email: '',
    },
    reducers: {
        setUsername: (state, action) => {
            state.fullName = action.payload
        },
        setPhotoUrl: (state, action) => {
            state.photoUrl = action.payload
        },
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        }
    }
})


export const { setUsername, setPhotoUrl, setPhoneNumber, setEmail} = profileSlice.actions;

export default profileSlice.reducer;