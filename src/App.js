import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.scss";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import classNames from "classnames";
import PrimeReact from "primereact/utils";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import AppConfig from "./AppConfig";
import AppFooter from "./AppFooter";
import AppMenu from "./AppMenu";
import AppNew from "./AppNew";
import AppRightMenu from "./AppRightMenu";
import AppTopBar from "./AppTopbar";
import { FormLayoutDemo } from "./components/FormLayoutDemo";
import GetDataService from "./service/GetDataService";
import AppTopMainBar from "./TopBar";

require("dotenv").config();

const App = () => {
  const history = useHistory();
  const [menuActive, setMenuActive] = useState(false);
  const [menuMode, setMenuMode] = useState("static");
  const [colorScheme, setColorScheme] = useState("light");
  const [menuTheme, setMenuTheme] = useState("layout-sidebar-darkgray");
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(
    false
  );
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
  const [
    topbarNotificationMenuActive,
    setTopbarNotificationMenuActive
  ] = useState(false);
  const [rightMenuActive, setRightMenuActive] = useState(false);
  const [configActive, setConfigActive] = useState(false);
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(false);
  const [menuList, setMenu] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [id, setId] = useState(null);
  const [menuActiveTabIndex, setMenuActiveTabIndex] = useState(0);

  const mainContentEleRef = useRef();
  const sideBarEleRef = useRef();
  const sideBarMenuEleRef = useRef();
  const sideBarSplitterEleRef = useRef();
  let menuClick = false;
  let searchClick = false;
  let userMenuClick = false;
  let notificationMenuClick = false;
  let rightMenuClick = false;
  let configClick = false;

  const getLatestList = (list, id) => {
    let flagParent = false;
    const items = list.map((item) => {
      if (item.items) {
        const { items, flag } = getLatestList(item.items, id, flagParent);
        item.items = items;
        flagParent = flag;
      }
      if (item.id == id) {
        flagParent = true;
      }
      item.isOpen = flagParent;

      return item;
    });

    return { items, flag: flagParent };
  };

  const getData = () => {
    const getDataService = new GetDataService(
      process.env.TRAINING_APP_BASE_URL
    );
    getDataService
      .getSidebarData("JOR")
      .then((data) => {
        setCompanyData(data.companies);
        return data;
      })
      .then((data) => {
        const { items, flag } = getLatestList(data.contents, id);
        setMenu(items);
      })
      .catch((err) => {
        console.log("err >>", err);
      });
  };

  const reducerFun = (state = menuList, action) => {
    switch (action) {
      case "GetData":
        return getData();
      default:
        return state;
    }
  };

  // eslint-disable-next-line no-unused-vars
  const [sidebarList, dispatch] = useReducer(reducerFun, menuList);

  useEffect(() => {
    getData();
  }, [id]);

  const menu = [
    {
      /*label: "Hierarchy", icon: "pi pi-fw pi-align-left",*/
      items: menuList
    }
  ];

  const routers = [
    {
      path: "/formlayout/:id",
      dispatch: (action) => {
        console.log("action router", action);
      },
      meta: { breadcrumb: [{ parent: "UI Kit", label: "Form Layout" }] },
      location: history.location
    }
  ];

  useEffect(() => {
    if (staticMenuMobileActive) {
      resetLayoutWidths();
      blockBodyScroll();
    } else {
      unblockBodyScroll();
    }
  }, [staticMenuMobileActive]);

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  };

  const onRippleChange = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onDocumentClick = () => {
    if (!searchClick && searchActive) {
      onSearchHide();
    }

    if (!userMenuClick) {
      setTopbarUserMenuActive(false);
    }

    if (!notificationMenuClick) {
      setTopbarNotificationMenuActive(false);
    }

    if (!rightMenuClick) {
      setRightMenuActive(false);
    }

    if (!menuClick) {
      if (isSlim()) {
        setMenuActive(false);
      }

      if (overlayMenuActive || staticMenuMobileActive) {
        hideOverlayMenu();
      }

      unblockBodyScroll();
    }

    if (configActive && !configClick) {
      setConfigActive(false);
    }

    searchClick = false;
    configClick = false;
    userMenuClick = false;
    rightMenuClick = false;
    notificationMenuClick = false;
    menuClick = false;
  };

  const onMenuClick = () => {
    menuClick = true;
  };

  const onMenuButtonClick = (event) => {
    menuClick = true;
    setTopbarUserMenuActive(false);
    setTopbarNotificationMenuActive(false);
    setRightMenuActive(false);

    if (isOverlay()) {
      setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
    }

    if (isDesktop()) {
      resetLayoutWidths();
      setStaticMenuDesktopInactive(
        (prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive
      );
    } else {
      setStaticMenuMobileActive(
        (prevStaticMenuMobileActive) => !prevStaticMenuMobileActive
      );
    }

    event.preventDefault();
  };

  const resetLayoutWidths = (event) => {
    mainContentEleRef.current.style.marginLeft = "";
    sideBarEleRef.current.style.width = "";
    sideBarMenuEleRef.current.style.width = "";
    if (sideBarSplitterEleRef.current)
      sideBarSplitterEleRef.current.style.width = "";
  };

  const activateStaticMenuDesktop = (event) => {
    setStaticMenuDesktopInactive(false);
  };

  const onMenuitemClick = (event) => {
    if (!event.item.items) {
      hideOverlayMenu();

      if (isSlim()) {
        setMenuActive(false);
      }
    }
  };

  const onRootMenuitemClick = () => {
    setMenuActive((prevMenuActive) => !prevMenuActive);
  };

  const onMenuThemeChange = (name) => {
    setMenuTheme("layout-sidebar-" + name);
  };

  const onMenuModeChange = (e) => {
    setMenuMode(e.value);
  };

  const onColorSchemeChange = (e) => {
    setColorScheme(e.value);
  };

  const onTopbarUserMenuButtonClick = (event) => {
    userMenuClick = true;
    setTopbarUserMenuActive(
      (prevTopbarUserMenuActive) => !prevTopbarUserMenuActive
    );

    hideOverlayMenu();

    event.preventDefault();
  };

  const onTopbarNotificationMenuButtonClick = (event) => {
    notificationMenuClick = true;
    setTopbarNotificationMenuActive(
      (prevTopbarNotificationMenuActive) => !prevTopbarNotificationMenuActive
    );

    hideOverlayMenu();

    event.preventDefault();
  };

  const toggleSearch = () => {
    setSearchActive((prevSearchActive) => !prevSearchActive);
    searchClick = true;
  };

  const onSearchClick = () => {
    searchClick = !searchClick;
  };

  const onSearchHide = () => {
    setSearchActive(false);
    searchClick = false;
  };

  const onRightMenuClick = () => {
    rightMenuClick = true;
  };

  const onRightMenuButtonClick = (event) => {
    rightMenuClick = true;
    setRightMenuActive((prevRightMenuActive) => !prevRightMenuActive);
    hideOverlayMenu();
    event.preventDefault();
  };

  const onConfigClick = () => {
    configClick = true;
  };

  const onConfigButtonClick = () => {
    setConfigActive((prevConfigActive) => !prevConfigActive);
    configClick = true;
  };

  const hideOverlayMenu = () => {
    setOverlayMenuActive(false);
    setStaticMenuMobileActive(false);
    unblockBodyScroll();
  };

  const blockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.add("blocked-scroll");
    } else {
      document.body.className += " blocked-scroll";
    }
  };

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
    }
  };

  const isSlim = () => {
    return menuMode === "slim";
  };

  const isOverlay = () => {
    return menuMode === "overlay";
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  const containerClassName = classNames(
    "layout-wrapper",
    {
      "layout-overlay": menuMode === "overlay",
      "layout-static": menuMode === "static",
      "layout-slim": menuMode === "slim",
      "layout-sidebar-dim": colorScheme === "dim",
      "layout-sidebar-dark": colorScheme === "dark",
      "layout-overlay-active": overlayMenuActive,
      "layout-mobile-active": staticMenuMobileActive,
      "layout-static-inactive":
        staticMenuDesktopInactive && menuMode === "static",
      "p-input-filled": inputStyle === "filled",
      "p-ripple-disabled": !ripple
    },
    colorScheme === "light" ? menuTheme : ""
  );

  return (
    <div>
      <div className="header sticky">
        <AppTopMainBar />
      </div>
      {/* eslint-disable */}
      <div
        className={containerClassName}
        data-theme={colorScheme}
        onClick={onDocumentClick}
      >
        {/* eslint-enable */}
        <div className="layout-content-wrapper mt-4" ref={mainContentEleRef}>
          <AppTopBar
            routers={routers}
            topbarNotificationMenuActive={topbarNotificationMenuActive}
            topbarUserMenuActive={topbarUserMenuActive}
            onMenuButtonClick={onMenuButtonClick}
            onSearchClick={toggleSearch}
            onTopbarNotification={onTopbarNotificationMenuButtonClick}
            onTopbarUserMenu={onTopbarUserMenuButtonClick}
            onRightMenuClick={onRightMenuButtonClick}
            onRightMenuButtonClick={onRightMenuButtonClick}
            mobileMenuActive={staticMenuMobileActive}
          ></AppTopBar>

          <div className="layout-content">
            {routers.map((router, index) => {
              if (router.exact) {
                return (
                  <Route
                    key={`router${index}`}
                    path={router.path}
                    exact
                    render={(props) => (
                      <FormLayoutDemo
                        {...props}
                        onDispatch={(action) => {
                          dispatch(action);
                        }}
                      />
                    )}
                  />
                );
              }
              return (
                <Route
                  key={`router${index}`}
                  path={router.path}
                  render={(props) => (
                    <FormLayoutDemo
                      {...props}
                      onDispatch={(action) => {
                        dispatch(action);
                      }}
                    />
                  )}
                />
              );
            })}
          </div>
          <AppFooter />
        </div>

        {menu && (
          <AppMenu
            model={menu}
            menuMode={menuMode}
            active={menuActive}
            mobileMenuActive={staticMenuMobileActive}
            staticMenuDesktopInactive={staticMenuDesktopInactive}
            onMenuClick={onMenuClick}
            onMenuitemClick={onMenuitemClick}
            onRootMenuitemClick={onRootMenuitemClick}
            onMenuButtonClick={onMenuButtonClick}
            mainContentEleRef={mainContentEleRef}
            activateStaticMenuDesktop={activateStaticMenuDesktop}
            sideBarEleRef={sideBarEleRef}
            sideBarMenuEleRef={sideBarMenuEleRef}
            sideBarSplitterEleRef={sideBarSplitterEleRef}
            menuActiveTabIndex={menuActiveTabIndex}
            setMenuActiveTabIndex={setMenuActiveTabIndex}
          ></AppMenu>
        )}
        <AppRightMenu
          rightMenuActive={rightMenuActive}
          onRightMenuClick={onRightMenuClick}
        ></AppRightMenu>

        <AppConfig
          configActive={configActive}
          menuMode={menuMode}
          onMenuModeChange={onMenuModeChange}
          menuTheme={menuTheme}
          onMenuThemeChange={onMenuThemeChange}
          colorScheme={colorScheme}
          onColorSchemeChange={onColorSchemeChange}
          onConfigClick={onConfigClick}
          onConfigButtonClick={onConfigButtonClick}
          rippleActive={ripple}
          onRippleChange={onRippleChange}
          inputStyle={inputStyle}
          onInputStyleChange={onInputStyleChange}
        ></AppConfig>

        <AppNew
          dispatchFun={(action) => {
            console.log(action);
            dispatch(action);
          }}
          companyData={companyData}
          searchActive={searchActive}
          onSearchClick={onSearchClick}
          onSearchHide={onSearchHide}
        />

        <div className="layout-mask modal-in"></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
