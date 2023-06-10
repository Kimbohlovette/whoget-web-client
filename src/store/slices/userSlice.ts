import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
	isAuthenticated: boolean;
	user: any;
	authToken: string;
}
const initialState: InitialState = {
	isAuthenticated: false,
	user: null,
	authToken: '',
};
const userSlice = createSlice({
	name: 'users/user',
	initialState,
	reducers: {
		updateAuthStatus: (state, action) => {
			state.isAuthenticated = action.payload;
		},
		setUserInfo: (state, action) => {
			state.user = action.payload;
		},
		updateAuthToken: (state, action) => {
			state.authToken = action.payload;
		},
	},
});

export const { updateAuthStatus, setUserInfo, updateAuthToken } =
	userSlice.actions;
export default userSlice.reducer;
