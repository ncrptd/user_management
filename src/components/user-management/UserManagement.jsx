// UserManagement.js
import { useNavigate } from 'react-router-dom';
import './UserManagement.css';

const UserManagement = ({ users, param, className }) => {
    const navigate = useNavigate();

    const onManage = () => {

        return navigate(`/user-details/${param}`)
    }

    return (
        <div className={`${className} user-management`}>
            <table>
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.organization}</td>
                            <td>{user.email}</td>
                            <td className='role'>{user.role}</td>
                            <td className="actions">
                                <button onClick={() => onManage()}>Manage</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
