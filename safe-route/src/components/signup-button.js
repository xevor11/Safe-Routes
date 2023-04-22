// import React from "react";
// import { useAuth } from "reactfire";
// import { Button } from "@mui/material";

// const SignupButton = () => {
//   const auth = useAuth();
//   const provider = new auth.GoogleAuthProvider();

//   const handleSignUp = async () => {
//     try {
//       await auth.signInWithPopup(provider);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Button variant="contained" color="primary" onClick={handleSignUp}>
//       Sign Up
//     </Button>
//   );
// };

// export default SignupButton;