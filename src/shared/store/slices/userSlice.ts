import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BalanceInfo = {
  credits: number;
  doty: number;
  storageCapacity: number;
  storageUsage: number;
} 

interface InitialState {
  balance: BalanceInfo;
}

const initialState: InitialState = {
  balance: {
    credits: 0,
    doty: 0,
    storageCapacity: 0,
    storageUsage: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBalance(state, action: PayloadAction<BalanceInfo>) {
      state.balance = action.payload;
    },
    updateBalance(
      state,
      action: PayloadAction<Partial<BalanceInfo>>
    ) {
      state.balance = {
        ...state.balance,
        ...action.payload,
      };
    },
  },
});

export const { setBalance, updateBalance } = userSlice.actions;
export default userSlice.reducer;