import { useDispatch, useSelector } from "react-redux";
import UserManagement from "../user-management/UserManagement";
import { toggleCreateAllRoleModal } from "../../features/modals/modalsSlice";
import { useEffect } from "react";
import { getUsers } from "../../features/users/usersSlice";
import { Button, CircularProgress } from "@mui/material";

function RootAdminUsers() {
    const allUsers = useSelector((state) => state.users.allUsers);
    const dispatch = useDispatch();

    const handleCreateUser = () => {
        dispatch(toggleCreateAllRoleModal());
    };

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div style={{ padding: 2 }}>
            <div style={{ marginBottom: 5, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateUser}
                    sx={{}}
                >
                    Create User
                </Button>
            </div>
            {allUsers ? (
                <UserManagement users={allUsers} />
            ) : (
                <p style={{ textAlign: "center" }}>
                    <CircularProgress />
                </p>
            )}
        </div>
    );
}

export default RootAdminUsers;
