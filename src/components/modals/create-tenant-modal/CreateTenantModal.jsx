import { useState } from 'react'
import { createUser } from '../../../features/users/usersSlice';
import { useDispatch } from 'react-redux';
import './CreateTenantModal.css'
import { toggleCreateTenantModal } from '../../../features/modals/modalsSlice';
import { getLoggedUser } from '../../../utils/getLoggedUser';
const roles = ['USER', 'TENANT_ADMIN'];


function CreateTenantModal() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: roles[0],
    });

    const [passwordError, setPasswordError] = useState(false);
    const loggedInUser = getLoggedUser();


    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.stopPropagation();
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError(true)
        } else {
            const userDetails = { ...formData, organization: loggedInUser.organization }
            dispatch(createUser(userDetails))
            dispatch(toggleCreateTenantModal())
        }

    };

    return (
        <div className="create-user-container" onClick={(e) => e.stopPropagation()}>
            <form className="create-user-form" onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Role:
                    <select name="role" value={formData.role} onChange={handleChange}>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </label>
                {passwordError && <p>Password Does Not Match</p>}
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateTenantModal