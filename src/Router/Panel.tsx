import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
import { Box, CssBaseline, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import KeyboardBackspaceRoundedIcon from "@material-ui/icons/KeyboardBackspaceRounded";

import { TopAppBar } from "app/TopAppBar";
import MainNav from "app/Drawer";
import MyBackdrop from "app/Backdrop";
import BottomNav from "app/BottomNav";

import ChatDrawer from "features/Chat/Drawer";

import { useSelector } from "react-redux";
import { selectSession } from "features/Session/sessionsSlice";
import { VerifyEmail } from "features/Modals/VerifyEmail";
import { PortalProvider } from "logic/PortalContext";
import { AppBarStation } from "logic/PortalContext/Stations";
import { LockProvider } from "common/Lock";
import Toast from "app/Toast";

const Production = React.lazy(() => import("./Production"));
const Purchase = React.lazy(() => import("./Purchasing"));
const Sales = React.lazy(() => import("./Sales"));
const Inventory = React.lazy(() => import("./Inventory"));
const Service = React.lazy(() => import("./Servicing"));
const Engineering = React.lazy(() => import("./Engineering"));
const ShippingAndReceiVing = React.lazy(() => import("./ShippingAndReceiving"));

const Home = React.lazy(() => import("../pages/home"));
const Dashboard = React.lazy(() => import("../pages/HomeDashboard"));
const Settings = React.lazy(() => import("../pages/Settings"));
const Roles = React.lazy(() => import("../pages/Roles"));
const Projects = React.lazy(() => import("../pages/Project"));
const Activity = React.lazy(() => import("../pages/Activity"));
const Notification = React.lazy(() => import("../pages/Notification"));
const Page404 = React.lazy(() => import("../pages/404"));

const QuoteDetails = React.lazy(() => import("../pages/QuoteDetails"));
const SODetails = React.lazy(() => import("../pages/SODetails"));
const CustomerDetails = React.lazy(() => import("../pages/CustomerDetails"));

const BomParts = React.lazy(() => import("../pages/BomParts"));
const JobParts = React.lazy(() => import("../pages/JobParts"));

const drawerWidth = 220;
export const chatDrawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: "54px",
    BorderBottom: "1px solid gray",
    boxShadow: "rgba(207, 171, 171, 0.08) 0px 4px 12px",
    backgroundColor: "rgb(30,40,50)",
    color: "white",
  },
  appBarShiftRight: {
    width: `calc(100% - ${chatDrawerWidth}px)`,
    marginRight: chatDrawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftLeft: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginRight: -chatDrawerWidth,
  },
  contentShiftRight: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  contentShiftLeft: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PanelRouter() {
  const phone = useMediaQuery("(max-width:900px)");
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const session = useSelector(selectSession);

  const [value, setValue] = React.useState("/panel/");

  const [mainDrawerOpen, setMainDrawerOpen] = useState(false);
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState<boolean>(false);

  useEffect(() => {
    if (session.session && !session?.session?.email) {
      setOpenEmailModal(true);
    }
  }, [session]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.push(newValue);
  };

  const handleDrawerOpen = () => {
    setMainDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setMainDrawerOpen(false);
  };

  return (
    <LockProvider>
      <PortalProvider>
        <div style={{ display: "flex" }} className={classes.root}>
          <CssBaseline />
          <VerifyEmail
            open={openEmailModal}
            onClose={() => {
              Toast("You must add an email before continue!", "error");
            }}
            onDone={() => {
              setOpenEmailModal(false);
            }}
            employeeId={session?.session?.id}
          />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShiftLeft]: mainDrawerOpen,
              [classes.appBarShiftRight]: chatDrawerOpen,
            })}
            style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          >
            <Toolbar>
              {phone ? (
                <IconButton
                  color="inherit"
                  aria-label="back"
                  onClick={() => {
                    history.goBack();
                  }}
                  edge="start"
                >
                  <KeyboardBackspaceRoundedIcon />
                </IconButton>
              ) : (
                <IconButton
                  id="open-drawer-button"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, mainDrawerOpen && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <AppBarStation />
              <TopAppBar
                isChatOpen={chatDrawerOpen}
                onOpenChatClicked={() => {
                  setChatDrawerOpen(true);
                  setMainDrawerOpen(false);
                }}
              />
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={mainDrawerOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div
              className={classes.drawerHeader}
              style={{
                backgroundColor: "#202731",
              }}
            >
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <div style={{ color: "white" }}>
                    <ChevronLeftIcon />
                  </div>
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <MainNav width={drawerWidth} closeIt={handleDrawerClose} />
          </Drawer>
          <main
            style={{ zIndex: 5 }}
            className={clsx(classes.content, {
              [classes.contentShiftLeft]: mainDrawerOpen,
              [classes.contentShiftRight]: chatDrawerOpen,
            })}
          >
            <Box
              style={phone ? { flexGrow: 1, padding: "1em", paddingBottom: "6em" } : { flexGrow: 1, padding: "1em" }}
            >
              <div style={theme.mixins.toolbar as any} />
              <Suspense fallback={<MyBackdrop />}>
                <Switch>
                  <Route exact path="/panel/home" component={() => <Home handleChange={handleChange} />} />
                  <Route exact path="/panel/notification" component={Notification} />
                  <Route exact path="/panel/dashboard" component={Dashboard} />
                  <Route exact path="/panel/settings" component={Settings} />
                  <Route exact path="/panel/projects" component={Projects} />
                  <Route exact path="/panel/activity" component={Activity} />
                  <Route exact path="/panel/roles" component={Roles} />

                  <Route path="/panel/shipping" component={ShippingAndReceiVing} />
                  <Route path="/panel/engineering" component={Engineering} />
                  <Route path="/panel/fieldservice" component={Service} />
                  <Route path="/panel/inventory" component={Inventory} />
                  <Route path="/panel/sales" component={Sales} />
                  <Route path="/panel/purchase" component={Purchase} />
                  <Route path="/panel/production" component={Production} />

                  <Route exact path="/panel/quote/:quoteNumber" component={QuoteDetails} />
                  <Route exact path="/panel/so/:soNumber" component={SODetails} />
                  {/* TODO: change customer to client, everywhere, there are links to this page */}
                  <Route exact path="/panel/customer/:cusNumber" component={CustomerDetails} />

                  <Route exact path="/panel/bom/:bomId/parts" component={BomParts} />
                  <Route exact path="/panel/job/:unitId" component={JobParts} />

                  <Route exact path="*" component={Page404} />
                </Switch>
              </Suspense>
            </Box>
          </main>

          <ChatDrawer open={chatDrawerOpen} onClose={() => setChatDrawerOpen(false)} />
        </div>
        {phone && <BottomNav value={value} handleChange={handleChange} />}
      </PortalProvider>
    </LockProvider>
  );
}
