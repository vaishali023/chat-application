import React from "react";
import "./NavBar.styles.scss";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "reactfire";
import { auth } from "../../firebase";
import { ChatContext } from "../../ChatContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const NavBar = () => {
  const { data: user } = useAuth();
  const { data: state } = useContext(ChatContext);
  const [displayPicture, setDisplayPicture] = useState("");

  useEffect(() => {
    const fetchDisplayPicture = async () => {
      try {
        const userDocRef = doc(db, "users", state.user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setDisplayPicture(userData.photoURL || "");
        }
      } catch (error) {
        console.log("Error fetching display picture:", error);
      }
    };

    if (state.user && state.user.uid) {
      fetchDisplayPicture();
    }
  }, [state.user]);

  const handleLogout = async () => {
    await auth.signOut();
  };

  const getInitials = (name) => {
    if (name) {
      const nameParts = name.split(" ");
      const initials = nameParts
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();
      return initials;
    }
    return "";
  };

  return (
    <div className="navBarContainer">
      <div className="userInfo">
        {displayPicture ? (
          <img src={displayPicture} alt="User" className="displayPicture" />
        ) : (
          <div className="initials">
            {getInitials(state.user && state.user.displayName)}
          </div>
        )}
        <p className="userName">
          Welcome {state.user && state.user.displayName} !
        </p>
      </div>
      <button onClick={handleLogout} className="logoutButton">
        Logout
      </button>
    </div>
  );
};

export default NavBar;
