import Nav from "../../components/Nav";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Nav />
      <div className="profile-container">
        <div className="profile-box">
          <h1>Welcome to your Profile</h1>
          {user ? (
            <div className="user-details">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>PhoneNumber:</strong> {user.phoneNumber}
              </p>
            </div>
          ) : (
            <p>You are not logged in.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

