import { BreadCrumb } from "primereact/breadcrumb";
import React from "react";

import AppBreadcrumb from "./AppBreadcrumb";

const AppTopbar = (props) => {
  let items = [];
  let baseurl = `${window.location.protocol}//${window.location.host}/#/formlayout`;
  console.log("baseurl :", baseurl);
  let url = props.routers[0].location.pathname;
  if (url && url === "/") {
    localStorage.clear();
  }

  function getLabel(type) {
    if (localStorage.getItem(type) && localStorage.getItem(type).length > 1) {
      return JSON.parse(localStorage.getItem(type)).title;
    } else {
      return "";
    }
  }
  function getId(type) {
    if (localStorage.getItem(type) && localStorage.getItem(type).length > 1) {
      return `${baseurl}/${JSON.parse(localStorage.getItem(type)).id}`;
    } else {
      return "";
    }
  }
  if (localStorage.getItem("chapter")) {
    items = [
      {
        label: getLabel("chapter"),
        url: getId("chapter")
      }
    ];
  }
  if (localStorage.getItem("section") && localStorage.getItem("chapter")) {
    items = [
      {
        label: getLabel("chapter"),
        url: getId("chapter")
      },
      {
        label: getLabel("section"),
        url: getId("section")
      }
    ];
  }
  if (
    localStorage.getItem("subSection") &&
    localStorage.getItem("section") &&
    localStorage.getItem("chapter")
  ) {
    items = [
      {
        label: getLabel("chapter"),
        url: getId("chapter")
      },
      {
        label: getLabel("section"),
        url: getId("section")
      },
      {
        label: getLabel("subSection"),
        url: getId("subSection")
      }
    ];
  }
  const home = { icon: "pi pi-home", url: "" };
  return (
    <div className="layout-topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="menu-button p-link"
          onClick={props.onMenuButtonClick}
        >
          <i className="pi pi-chevron-left"></i>
        </button>
        {items.length > 0 ? <BreadCrumb model={items} home={home} /> : ""}
        {/* <div className="layout-breadcrumb viewname" >
                        <AppBreadcrumb routers={props.routers} />

                    </div>

                <img id="logo-mobile" className="mobile-logo" src="assets/layout/images/logo-dark.svg" alt="diamond-layout" />*/}
      </div>

      <div className="topbar-right">
        <button type="button" className="p-link" onClick={props.onSearchClick}>
          <i className="pi pi-plus-circle"></i> Add New
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/*<ul className="topbar-menu">
                    <li className="search-item">
                        <button type="button" className="p-link" onClick={props.onSearchClick}>
                            <i className="pi pi-search"></i>
                        </button>
                    </li>
                    <li className={notificationsItemClassName}>
                        <button type="button" className="p-link" onClick={props.onTopbarNotification}>
                            <i className="pi pi-bell"></i>
                            <span className="topbar-badge">5</span>
                        </button>
                        <ul className="notifications-menu fade-in-up">
                            <li role="menuitem">
                                <button type="button" className="p-link" tabIndex="0">
                                    <i className="pi pi-shopping-cart"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">New Order</div>
                                        <div className="notification-detail">You have <strong>3</strong> new orders.</div>
                                    </div>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button type="button" className="p-link">
                                    <i className="pi pi-check-square"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">Withdrawn Completed</div>
                                        <div className="notification-detail">Funds are on their way.</div>
                                    </div>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button type="button" className="p-link">
                                    <i className="pi pi-chart-line"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">Monthly Reports</div>
                                        <div className="notification-detail">New reports are ready.</div>
                                    </div>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button type="button" className="p-link">
                                    <i className="pi pi-comments"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">Comments</div>
                                        <div className="notification-detail"><strong>2</strong> new comments.</div>
                                    </div>
                                </button>
                            </li>
                            <li role="menuitem">
                                <button type="button" className="p-link">
                                    <i className="pi pi-exclamation-circle"></i>
                                    <div className="notification-item">
                                        <div className="notification-summary">Chargeback Request</div>
                                        <div className="notification-detail"><strong>1</strong> to review.</div>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </li>

                    <li className={profileItemClassName}>
                        <button type="button" className="p-link" onClick={props.onTopbarUserMenu}>
                            <img src="assets/demo/images/avatar/profile.jpg" alt="diamond-layout" className="profile-image" />
                            <span className="profile-name">Amelia Stone</span>
                        </button>
                        <ul className="profile-menu fade-in-up">
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-user"></i>
                                    <span>Profile</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-cog"></i>
                                    <span>Settings</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-calendar"></i>
                                    <span>Calendar</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-inbox"></i>
                                    <span>Inbox</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-power-off"></i>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </li>

                    <li className="right-sidebar-item">
                        <button type="button" className="p-link" onClick={props.onRightMenuButtonClick}>
                            <i className="pi pi-align-right"></i>
                        </button>
                    </li>
                </ul>*/}
      </div>
    </div>
  );
};

export default AppTopbar;
