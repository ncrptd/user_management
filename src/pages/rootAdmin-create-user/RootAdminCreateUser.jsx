import { useState } from 'react';
import './RootAdminCreateUser.css';
import { createUser } from '../../features/users/usersSlice';
import { useDispatch } from 'react-redux';

const roles = ['Tenant Admin', 'Tenant', 'User'];

const RootAdminCreateUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        password: '',
        confirmPassword: '',
        role: roles[0],
    });

    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (formData.password === formData.confirmPassword) {
        //     createUser(formData)

        // }

        dispatch(createUser({
            firstName: 'Rakesh',
            lastName: 'Roshan',
            email: 'rakesh.roshan@example.com',
            organization: 'Acme Corp',
            password: 'securePassword123',
        }))
    };

    return (
        <div className='create-user-root'>
            <h1>Root Admin Create User</h1>
            <button onClick={handleSubmit}>click</button>
            <div className="create-user-container">
                <form className="create-user-form">
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
                        Organization:
                        <input type="text"
                            name='organization'
                            value={formData.organization}
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
                    <button type="submit">Create User</button>
                </form>
            </div>
        </div>
    );
};

export default RootAdminCreateUser;
