import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RolePermissions = {
    id: string;
    name: string;
    permissions: any;
};

type RoleState = {
    role: RolePermissions | null;
};

const initialState: RoleState = {
    role: null
};

export const RolePermissionsStateSlice = createSlice({
    name: 'rolePermissionsState',
    initialState,
    reducers: {
        setRolePermissions: (state, action: PayloadAction<RolePermissions>) => {
            console.log("action", action)
            state.role = JSON.parse(JSON.stringify(action.payload));
            // localStorage.setItem('rolePermission', JSON.stringify(action.payload));
        }
    },
});

export const { setRolePermissions } = RolePermissionsStateSlice.actions;

export default RolePermissionsStateSlice.reducer;
