// components/Layout.js
import { Container, Toolbar } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { Component, ReactNode } from "react";
import { useRecoilState } from "recoil";
import Copyright from "../src/Copyright";
import { recoilUserId } from "../states";
import NavigationBar from "./NavigationBar";

type LayoutProp = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  const [userId, setUserId] = useRecoilState(recoilUserId);
  const route = useRouter();
  React.useEffect(() => {
    if (userId !== "0" && route.pathname === "/") {
      route.push("/home");
    }
    if (userId === "0" && route.pathname !== "/") {
      route.push("/");
    }
  }, [route]);

  return (
    <Container
      sx={[
        route.pathname === "/auto"
          ? { width: "100%", height: "80vh" }
          : {
              minWidth: {
                xs: 350,
                sm: 600,
              },
              maxWidth: {
                xs: 450,
                sm: 600,
              },
            },
      ]}
    >
      <NavigationBar />
      <Toolbar />
      {children}
      <Copyright />
    </Container>
  );
};

export default Layout;
