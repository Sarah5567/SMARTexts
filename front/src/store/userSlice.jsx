import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'unknown',
    email: 'example@example.com'
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) =>{
            state.name = action.payload.name
            state.email = action.payload.email
        }
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer
