import Nav from "../../components/Nav";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
  
    <div>
        <><Nav/>
    </>
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
          <p>
            <strong>User Id:</strong> {user._id}
          </p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
