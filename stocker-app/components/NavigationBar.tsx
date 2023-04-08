import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { recoilUserId } from "../states";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 280;
const navItems = [
  { route: "home", title: "Home" },
  { route: "trade", title: "Trade" },
  { route: "auto", title: "Auto" },
];
const MappingRoute = { home: "Home", trade: "Trade", auto: "Auto" };

export default function NavigationBar(props: Props) {
  const route = useRouter();
  const [userId, setUserId] = useRecoilState(recoilUserId);
  const handleLogout = () => {
    Cookies.remove("userId");
    setUserId("0");
    route.push("/");
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CityStockers
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link href={`/${item.route}`} key={item.route}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {route.pathname !== "/" && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={handleLogout}>
              <ListItemText primary={"LogOut"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ display: "flex", alignItems: "center" }}>
        <Toolbar sx={{ maxWidth: 600, width: "100%" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            CityStockers
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {navItems.map((item) => (
              <Link href={`/${item.route}`} key={item.route}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            {route.pathname !== "/" && (
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={handleLogout}
                >
                  <ListItemText primary={"LogOut"} />
                </ListItemButton>
              </ListItem>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
