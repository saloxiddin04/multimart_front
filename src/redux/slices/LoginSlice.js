import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from "../../firebase.config";
import {toast} from "react-toastify";

const token = localStorage.getItem('token') || ""
const user = JSON.parse(localStorage.getItem("user")) || ""


const initialState = {
    user,
    token,
    loading: false,
    error: null
}

export const signUpUser = createAsyncThunk(
    "ecommerce/signUp",
    async ({email, password}, {rejectWithValue}) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const {user} = userCredential
            toast.success("Logged successfully")
            return user
        } catch (e) {
            if (e.message && e.response.data.message) {
                return rejectWithValue(e.message)
            }
            return rejectWithValue(e.message);
            // console.log(e)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout:(state, _) => {
            signOut(auth).then(() => {
                state.user = {}
                state.token = ""
                toast.success("Logged out")
            })
        }
    },
    extraReducers: {
        [signUpUser.pending]: (state, _) => {
            state.loading = true
        },
        [signUpUser.fulfilled]: (state, {payload}) => {
            state.loading = false
            if (payload) {
                state.user = payload
                state.token = payload.uid
                localStorage.setItem('user', JSON.stringify(payload))
                localStorage.setItem('token', payload.uid)
            }
        },
        [signUpUser.rejected]: (state, {payload}) => {
            state.error = payload.error
        }
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer
