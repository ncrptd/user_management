import { useNavigate } from 'react-router-dom';
import './UserProfile.css';


const user = {
    id: 2,
    organization: 'abc',
    email: 'jane@example.com',
    role: 'user',
    name: 'Jane Doe'
};




const UserProfile = () => {
    const { id, organization, email, role, name } = user;

    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/edit-user-profile')
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2 className="user-name">{name}</h2>
                <p className="user-role">{role}</p>
            </div>
            <div className="profile-details">
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Organization:</strong> {organization}</p>
            </div>
            <button className="edit-button" onClick={handleEditProfile}>Edit Profile</button>
        </div>
    );
};

export default UserProfile;
