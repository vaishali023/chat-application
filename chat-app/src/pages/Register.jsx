import React, { useState } from "react";
import Add from "../assets/AddDisplayPicture.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore"; 
import { auth, storage, db } from "../firebase"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const navigate = useNavigate();

  const handlePictureChange = (e) => {
    setSelectedPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target.elements.displayName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    // Perform form validation
    if (!displayName || !email || !password) {
      console.log("Please fill in all fields");
      return;
    }

    try {
      // Register the user using Firebase Authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // Upload display picture to Firebase Storage
      if (selectedPicture) {
        const storageRef = ref(
          storage,
          `displayPictures/${user.uid}/${selectedPicture.name}`
        );
        await uploadBytesResumable(storageRef, selectedPicture).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // Update profile
              await updateProfile(user, {
                displayName,
                photoURL: downloadURL,
              });

              // Store additional user data in Firestore
              const userCollection = collection(db, "users"); 
              await setDoc(doc(userCollection, user.uid), {
               
                uid: user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              // Clear the form fields after successful registration
              e.target.elements.displayName.value = "";
              e.target.elements.email.value = "";
              e.target.elements.password.value = "";

              navigate("/");
            } catch (err) {
              console.log(err);
            }
          });
        });
      } else {
        // If no picture selected, only update the profile without storing the picture in storage
        await updateProfile(user, {
          displayName,
        });

        // Store additional user data in Firestore
        const userCollection = collection(db, "users"); 
        await setDoc(doc(userCollection, user.uid), {
         
          uid: user.uid,
          displayName,
          email,
        });

        // Clear the form fields after successful registration
        e.target.elements.displayName.value = "";
        e.target.elements.email.value = "";
        e.target.elements.password.value = "";

        navigate("/");
      }
    } catch (error) {
      // Handle registration errors
      console.log("Registration error:", error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="wrapper">
        <h2 className="title">Welcome to the Chat!</h2>
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" name="displayName" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />

          <input
            className="addProfile"
            type="file"
            id="addPicture"
            onChange={handlePictureChange}
          />
          <label htmlFor="addPicture">
            <img src={Add} alt="Display Picture" />
            <span>Add your Display Picture</span>
          </label>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
