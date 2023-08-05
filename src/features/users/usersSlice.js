import {
  // createAsyncThunk,
  createEntityAdapter,
  createSelector
  // createSlice
} from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await client.get('/fakeApi/users')
//   return response.data
// })

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData)
      }
    })
  })
})

export const { useGetUsersQuery } = extendedApiSlice

export const selectUsersResult = apiSlice.endpoints.getUsers.select()

export const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
)

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: [],
//   reducers: {}
// })

// export default usersSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
