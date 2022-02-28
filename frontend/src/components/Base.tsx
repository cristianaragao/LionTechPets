import React, { ReactElement, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import { useRouter } from 'next/router'

import routes, { Route } from "../routes";

import { AuthContext } from './contexts/AuthContext';

const drawerWidth = 220;
interface Props {
  window?: () => Window;
  children: ReactElement<any, any>;
  title: string;
}

export default function ResponsiveDrawer(props: Props) {
  const { window, children, title } = props;

  const { logout, username } = useContext(AuthContext);

  const routersNext = useRouter()

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const redirect = async (path: string) => {
    return await routersNext.push(path);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sort = (a: Route, b: Route) => {

    if (a.name < b.name) return -1;
    if (a.name < b.name) return 1;

    return 1;

  };

  const drawer = (
    <div style={{ backgroundColor: "#254960", height: "100%", padding: "0 0.5rem" }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="subtitle1" fontWeight="bold" color="white">
          Liontech IR Pets
        </Typography>
      </Toolbar>

      <List>
        {routes.sort(sort).map((route: Route, index: number) => (
          <ListItem
            style={{
              backgroundColor: routersNext.asPath === route.path ? "#88ABC2" : "transparent",
              borderRadius: "0.2rem"
            }}
            button
            key={route.id}
            onClick={() => redirect(route.path)}
          >
            <ListItemIcon>
              {route.icon}
            </ListItemIcon>
            <ListItemText
              primary={route.name}
              primaryTypographyProps={{
                variant: "overline",
                color: "white",
                lineHeight: "1rem",
                fontWeight: "bold",
              }}

            />
          </ListItem>
        ))}
      </List>
      <Divider color="white" style={{ margin: "auto", width: "90%", opacity: "0.5" }} />
      <List>
        <ListItem
          button
          onClick={() => logout()}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ fontSize: 27, color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary="Sair"
            primaryTypographyProps={{
              variant: "overline",
              color: "white",
              lineHeight: "1rem",
              fontWeight: "bold",
            }}

          />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: { xs: 'block', sm: 'none' },
          ml: { sm: `${drawerWidth}px` },
          border: "none"
        }}
        style={{ backgroundColor: "#254960" }}
      >
        <Toolbar style={{ backgroundColor: "#254960" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, marginLeft: "0.5rem" }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="subtitle1"
            noWrap
            color="white"
            fontWeight="bold"
            marginLeft="2rem"
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            borderRight: "none"
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: "none" },
            borderRight: "none"
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: "1rem 3rem", width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {children}
      </Box>
    </Box>
  );
}
