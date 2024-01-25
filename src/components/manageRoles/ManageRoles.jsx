import { useState } from "react";
import { getLoggedUser } from "../../utils/getLoggedUser";
import { useDispatch } from "react-redux";
import { manageRoles } from "../../features/users/usersSlice";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

function ManageRoles({ userId }) {
    const [selectedRole, setSelectedRole] = useState("USER");
    const loggedInUser = getLoggedUser();
    const dispatch = useDispatch();
    const theme = useTheme();

    const onManageRoles = () => {
        dispatch(manageRoles({ userId, newRole: selectedRole }));
    };

    return (
        <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
                Manage Role:
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="roles">Select Role</InputLabel>
                        <Select
                            label="Select Role"
                            id="roles"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <MenuItem value="USER">USER</MenuItem>
                            {loggedInUser.role === "ROOT_ADMIN" && <MenuItem value="TENANT">TENANT</MenuItem>}
                            <MenuItem value="TENANT_ADMIN">TENANT_ADMIN</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" onClick={onManageRoles} fullWidth sx={{
                        backgroundColor: theme.palette.primary.brand,
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.brand,

                        },
                    }}>
                        Save Role
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ManageRoles;
