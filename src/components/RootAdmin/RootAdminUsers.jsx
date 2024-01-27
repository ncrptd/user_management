import { useDispatch, useSelector } from "react-redux";
import UserManagement from "../user-management/UserManagement";
import { useEffect } from "react";
import { getUsers } from "../../features/users/usersSlice";
import { CircularProgress } from "@mui/material";
import RootAdminCreateUserForm from "../modals/rootAdminCreateUserForm/RootAdminCreateUserForm";

function RootAdminUsers() {
    const allUsers = useSelector((state) => state.users.allUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div style={{ padding: 2 }}>

            <RootAdminCreateUserForm />
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
