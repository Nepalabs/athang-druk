import React, { useEffect, useState } from "react";
import Nav from "../../components/ProfileNav";
import { useAuth } from "../../contexts/AuthContext";
import '../../Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [currentLoginTime, setCurrentLoginTime] = useState(null);

  useEffect(() => {
    // Get the most recent active login session (no logoutTime)
    const sessions = JSON.parse(localStorage.getItem("sessionHistory")) || [];
    const activeSession = sessions.find((session) => !session.logoutTime);

    if (activeSession) {
      setCurrentLoginTime(activeSession.loginTime);
    }
  }, [user]);

  const formatDateTime = (isoString) => {
    if (!isoString) return "Unknown";
    try {
      return new Date(isoString).toLocaleString("en-US", {
        timeZone: "Asia/Thimphu",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="profile-container">
      <Nav />
      <h1>Welcome to your Profile</h1>

      {user ? (
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Logged in at:</strong> {formatDateTime(currentLoginTime)}</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
