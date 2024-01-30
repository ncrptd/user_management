import { useState } from "react";
import { getLoggedUser } from "../../utils/getLoggedUser";
import { useDispatch } from "react-redux";
import { manageRoles } from "../../features/users/usersSlice";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from "@emotion/react";
import SaveIcon from '@mui/icons-material/Save';

function ManageRoles({ userId }) {
    const [selectedRole, setSelectedRole] = useState("USER");
    const loggedInUser = getLoggedUser();
    const dispatch = useDispatch();
    const theme = useTheme();

    const onManageRoles = () => {
        dispatch(manageRoles({ userId, newRole: selectedRole }));
    };

    return (
        <Box mt={2} display="flex" alignItems="center">

            <FormControl sx={{ minWidth: 120, marginRight: 1 }}> {/* Set a minWidth */}
                <InputLabel htmlFor="roles">Select Role</InputLabel>
                <Select
                    label="Select Role"
                    id="roles"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    sx={{ width: 200 }}
                >
                    <MenuItem value="USER">USER</MenuItem>
                    {loggedInUser.role === "ROOT_ADMIN" && <MenuItem value="TENANT">TENANT</MenuItem>}
                    <MenuItem value="TENANT_ADMIN">TENANT_ADMIN</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={onManageRoles}
                startIcon={<SaveIcon />}
                sx={{
                    backgroundColor: theme.palette.primary.brand, '&:hover': {
                        background: theme.palette.secondary.brand
                    },
                }}
            >
                Save Role
            </Button>
        </Box>
    );
}

export default ManageRoles;
