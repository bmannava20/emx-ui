import classNames from "classnames";
import { Ripple } from "primereact/ripple";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const AppSubmenu = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const onMenuItemClick = (event, item, index) => {
    if (item.typeIdentifier === "CHAPTER") {
      localStorage.clear();
      localStorage.setItem("chapter", JSON.stringify(item));
      localStorage.setItem("section", "");
      localStorage.setItem("subSection", "");
    } else if (item.typeIdentifier === "SECTION") {
      localStorage.setItem("section", JSON.stringify(item));
      localStorage.setItem("subSection", "");
    } else if (item.typeIdentifier === "SUBSECTION") {
      localStorage.setItem("subSection", JSON.stringify(item));
    }
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
      event.preventDefault();
    }
    if (item.items) {
      //event.preventDefault();
    }
    if (props.root) {
      props.onRootMenuitemClick({
        originalEvent: event
      });
    }
    if (item.items) {
      setActiveIndex(index === activeIndex ? null : index);
    }

    props.onMenuitemClick({
      originalEvent: event,
      item: item
    });
  };

  const onMenuItemMouseEnter = (index) => {
    if (
      props.root &&
      props.menuActive &&
      props.menuMode === "slim" &&
      !isMobile()
    ) {
      setActiveIndex(index);
    }
  };

  const visible = (item) => {
    return typeof item.visible === "function"
      ? item.visible()
      : item.visible !== false;
  };

  const isMobile = () => {
    return window.innerWidth <= 991;
  };

  const isSlim = useCallback(() => {
    return props.menuMode === "slim";
  }, [props.menuMode]);

  const getLink = (item, index) => {
    const commonLinkProps = {
      style: item.style,
      className: classNames(item.class, "p-ripple", {
        "p-disabled": item.disabled,
        "p-link": !item.to
      }),
      target: item.target,
      onClick: (e) => onMenuItemClick(e, item, index),
      onMouseEnter: () => onMenuItemMouseEnter(index)
    };

    const menuitemIconClassName = classNames(
      "layout-menuitem-icon",
      item.items
        ? index === activeIndex || item.isOpen
          ? "pi pi-fw pi-minus-circle"
          : "pi pi-fw pi-plus-circle"
        : "pi pi-fw pi-file-o"
    );
    const content = (
      <>
        <i
          style={{ width: "18px", fontSize: "0.9rem", color: "#9a9797" }}
          className={menuitemIconClassName}
        ></i>
        <span className="layout-menuitem-text">{item.title}</span>
        <Ripple />
      </>
    );

    // if (item.url) {
    //     return <a href={item.url} rel="noopener noreferrer" {...commonLinkProps}>{content}</a>
    // }
    // else if (!item.to) {
    //     return <button type="button" {...commonLinkProps}>{content}</button>
    // }
    return (
      <NavLink
        to={{
          pathname: `/formlayout/${item.id}`,
          state: { ...item }
        }}
        exact
        activeClassName="active-route"
        {...commonLinkProps}
      >
        {content}
      </NavLink>
    );
  };

  const isMenuActive = (item, index) => {
    return (
      item.items &&
      ((props.root &&
      (!isSlim() ||
        (isSlim() && (props.mobileMenuActive || activeIndex !== null)))
        ? true
        : activeIndex === index) ||
        item.isOpen)
    );
    // return item.items && ((props.root && (!isSlim() || (isSlim() && (props.mobileMenuActive || activeIndex !== null))) ? true : activeIndex === index) || item.isOpen);
  };

  const getItems = () => {
    const transitionTimeout = props.mobileMenuActive
      ? 0
      : isSlim() && props.root
      ? { enter: 400, exit: 400 }
      : props.root
      ? 0
      : { enter: 1000, exit: 450 };
    return props.items.map((item, i) => {
      if (visible(item)) {
        if (!item.separator) {
          const menuitemClassName = classNames({
            "layout-root-menuitem": props.root,
            "active-menuitem": activeIndex === i && !item.disabled
          });
          const link = getLink(item, i);
          const rootMenuItem = props.root && (
            <div className="layout-root-menuitem">
              <div
                className="layout-menuitem-root-text"
                style={{ textTransform: "uppercase" }}
              >
                {item.title}
              </div>
            </div>
          );

          return (
            <li key={i} className={menuitemClassName} role="menuitem">
              {link}
              {rootMenuItem}
              <CSSTransition
                classNames="layout-menu"
                timeout={transitionTimeout}
                in={isMenuActive(item, i)}
                unmountOnExit
              >
                <AppSubmenu
                  items={visible(item) && item.items}
                  menuActive={props.menuActive}
                  menuMode={props.menuMode}
                  parentMenuItemActive={activeIndex === i}
                  onMenuitemClick={props.onMenuitemClick}
                ></AppSubmenu>
              </CSSTransition>
            </li>
          );
        } else {
          return (
            <li
              className="menu-separator"
              style={item.style}
              key={`separator${i}`}
              role="separator"
            ></li>
          );
        }
      }

      return null;
    });
  };

  useEffect(() => {
    if (!props.menuActive && isSlim()) {
      setActiveIndex(null);
    }
  }, [props.menuActive, isSlim]);

  if (!props.items) {
    return null;
  }

  const items = getItems();
  return (
    <ul className="layout-menu" role="menu">
      {items}
    </ul>
  );
};

export default AppSubmenu;
