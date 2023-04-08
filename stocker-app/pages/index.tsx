import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import NavigationBar from "../components/NavigationBar";
import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { recoilUserId } from "../states";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();
  const [userId, setUserId] = useRecoilState(recoilUserId);
  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUserId(user.uid);
        Cookies.set("userId", user.uid);
        router.push("./home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        fontWeight={600}
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Cryptocurrency Market Simulator
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        marginBottom={4}
        sx={{ textAlign: "center" }}
      >
        Practice trading cryptocurrency using Virtual Money without any loss and
        test your own auto trading algorithm!
      </Typography>

      <Button variant="contained" onClick={login}>
        login With Google
      </Button>
    </Box>
  );
}
