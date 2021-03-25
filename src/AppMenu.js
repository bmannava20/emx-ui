import { TabPanel, TabView } from "primereact/tabview";
import React, { useRef } from "react";

import AppSubmenu from "./AppSubmenu";
import Splitter from "./components/Splitter";

const AppMenu = (props) => {
  return (
    /* eslint-disable */
    <div
      className="layout-sidebar"
      onClick={props.onMenuClick}
      ref={props.sideBarEleRef}
    >
      {/* eslint-enable */}
      <div className="layout-menu-container" ref={props.sideBarMenuEleRef}>
        <TabView
          activeIndex={props.menuActiveTabIndex}
          onTabChange={(event) => props.setMenuActiveTabIndex(event.index)}
        >
          <TabPanel leftIcon="pi pi-fw pi-list">
            <AppSubmenu
              items={props.model}
              menuMode={props.menuMode}
              parentMenuItemActive
              menuActive={props.active}
              mobileMenuActive={props.mobileMenuActive}
              root
              onMenuitemClick={props.onMenuitemClick}
              onRootMenuitemClick={props.onRootMenuitemClick}
            />
          </TabPanel>
          <TabPanel leftIcon="pi pi-fw pi-search">Coming Soon....</TabPanel>
        </TabView>
      </div>
      {!props.mobileMenuActive && (
        <Splitter
          handleSideBarToggle={props.onMenuButtonClick}
          sidebarCollapsed={props.staticMenuDesktopInactive}
          sideBarEleRef={props.sideBarEleRef}
          mainContentEleRef={props.mainContentEleRef}
          activateStaticMenuDesktop={props.activateStaticMenuDesktop}
          sideBarMenuEleRef={props.sideBarMenuEleRef}
          sideBarSplitterEleRef={props.sideBarSplitterEleRef}
        />
      )}
    </div>
  );
};

export default AppMenu;
