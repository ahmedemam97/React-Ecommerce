import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let initialState = {
    brands: [],
    loading: false,
    error: null
};
export let getBrands = createAsyncThunk('brandsSlice/getBrands', 
    async ()=> {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        // console.log(data);
        return data.data;
    }    
)
const brandsSlice = createSlice({
    name: 'brandsSlice',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getBrands.pending, (state, action)=> {
            state.loading = true
        });
        
        builder.addCase(getBrands.rejected, (state, action)=> {
            state.error = action.payload
            state.loading = false;
        });

        builder.addCase(getBrands.fulfilled, (state, action)=> {
            state.brands = action.payload;
            state.loading = false
        });

        
    }
})

export const brandsReducer = brandsSlice.reducer;
