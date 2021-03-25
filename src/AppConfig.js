import classNames from "classnames";
import { InputSwitch } from "primereact/inputswitch";
import { RadioButton } from "primereact/radiobutton";
import React, { useState } from "react";

const AppConfig = (props) => {
  const [logoColor, setLogoColor] = useState("white");

  const menuThemes = [
    {
      name: "white",
      color: "#ffffff",
      logoColor: "dark",
      componentTheme: null
    },
    {
      name: "darkgray",
      color: "#343a40",
      logoColor: "white",
      componentTheme: null
    },
    {
      name: "blue",
      color: "#1976d2",
      logoColor: "white",
      componentTheme: "blue"
    },
    {
      name: "bluegray",
      color: "#455a64",
      logoColor: "white",
      componentTheme: "lightgreen"
    },
    {
      name: "brown",
      color: "#5d4037",
      logoColor: "white",
      componentTheme: "cyan"
    },
    {
      name: "cyan",
      color: "#0097a7",
      logoColor: "white",
      componentTheme: "cyan"
    },
    {
      name: "green",
      color: "#388e3C",
      logoColor: "white",
      componentTheme: "green"
    },
    {
      name: "indigo",
      color: "#303f9f",
      logoColor: "white",
      componentTheme: "indigo"
    },
    {
      name: "deeppurple",
      color: "#512da8",
      logoColor: "white",
      componentTheme: "deeppurple"
    },
    {
      name: "orange",
      color: "#F57c00",
      logoColor: "dark",
      componentTheme: "orange"
    },
    {
      name: "pink",
      color: "#c2185b",
      logoColor: "white",
      componentTheme: "pink"
    },
    {
      name: "purple",
      color: "#7b1fa2",
      logoColor: "white",
      componentTheme: "purple"
    },
    {
      name: "teal",
      color: "#00796b",
      logoColor: "white",
      componentTheme: "teal"
    }
  ];

  const componentThemes = [
    { name: "blue", color: "#42A5F5" },
    { name: "green", color: "#66BB6A" },
    { name: "lightgreen", color: "#9CCC65" },
    { name: "purple", color: "#AB47BC" },
    { name: "deeppurple", color: "#7E57C2" },
    { name: "indigo", color: "#5C6BC0" },
    { name: "orange", color: "#FFA726" },
    { name: "cyan", color: "#26C6DA" },
    { name: "pink", color: "#EC407A" },
    { name: "teal", color: "#26A69A" }
  ];

  const changeComponentTheme = (theme) => {
    changeStyleSheetUrl("theme-css", theme, 3);
  };

  const onConfigButtonClick = (event) => {
    props.onConfigButtonClick(event);
    event.preventDefault();
  };

  const changeMenuTheme = (name, logoColor, componentTheme) => {
    props.onMenuThemeChange(name);
    changeStyleSheetUrl("theme-css", componentTheme, 2);

    const appLogoLink = document.getElementById("app-logo");
    const appLogoUrl = `assets/layout/images/logo-${
      logoColor === "dark" ? "dark" : "white"
    }.svg`;

    if (appLogoLink) {
      appLogoLink.src = appLogoUrl;
    }
    setLogoColor(logoColor);
  };

  const changeColorScheme = (e) => {
    props.onColorSchemeChange(e);

    const scheme = e.value;
    changeStyleSheetUrl("layout-css", "layout-" + scheme + ".css", 1);
    changeStyleSheetUrl("theme-css", "theme-" + scheme + ".css", 1);
    changeLogo(scheme);
  };

  const changeStyleSheetUrl = (id, value, from) => {
    const element = document.getElementById(id);
    const urlTokens = element.getAttribute("href").split("/");

    if (from === 1) {
      // which function invoked this function
      urlTokens[urlTokens.length - 1] = value;
    } else if (from === 2) {
      // which function invoked this function
      if (value !== null) {
        urlTokens[urlTokens.length - 2] = value;
      }
    } else if (from === 3) {
      // which function invoked this function
      urlTokens[urlTokens.length - 2] = value;
    }

    const newURL = urlTokens.join("/");

    replaceLink(element, newURL);
  };

  const changeLogo = (scheme) => {
    const appLogoLink = document.getElementById("app-logo");
    const mobileLogoLink = document.getElementById("logo-mobile");
    const invoiceLogoLink = document.getElementById("invoice-logo");
    const footerLogoLink = document.getElementById("footer-logo");
    const logoUrl = `assets/layout/images/logo-${
      scheme === "light" ? "dark" : "white"
    }.svg`;

    if (appLogoLink) {
      appLogoLink.src = `assets/layout/images/logo-${
        scheme === "light" ? logoColor : "white"
      }.svg`;
    }

    if (mobileLogoLink) {
      mobileLogoLink.src = logoUrl;
    }

    if (invoiceLogoLink) {
      invoiceLogoLink.src = logoUrl;
    }

    if (footerLogoLink) {
      footerLogoLink.src = logoUrl;
    }
  };

  const replaceLink = (linkElement, href) => {
    if (isIE()) {
      linkElement.setAttribute("href", href);
    } else {
      const id = linkElement.getAttribute("id");
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute("href", href);
      cloneLinkElement.setAttribute("id", id + "-clone");

      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
      );

      cloneLinkElement.addEventListener("load", () => {
        linkElement.remove();
        cloneLinkElement.setAttribute("id", id);
      });
    }
  };

  const isIE = () => {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  };

  const getMenuThemes = () => {
    if (props.colorScheme === "light") {
      return (
        <div className="layout-themes">
          {menuThemes.map((theme) => {
            return (
              <div key={theme.name}>
                <button
                  type="button"
                  className="p-link"
                  style={{ cursor: "pointer", backgroundColor: theme.color }}
                  onClick={() =>
                    changeMenuTheme(
                      theme.name,
                      theme.logoColor,
                      theme.componentTheme
                    )
                  }
                  title={theme.name}
                ></button>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div>
        <p>
          Menu themes are only available in light mode by design as large
          surfaces can emit too much brightness in dark mode.
        </p>
      </div>
    );
  };

  const getComponentThemes = () => {
    return (
      <div className="layout-themes">
        {componentThemes.map((theme) => {
          return (
            <div key={theme.name}>
              <button
                type="button"
                className="p-link"
                style={{ cursor: "pointer", backgroundColor: theme.color }}
                onClick={() => changeComponentTheme(theme.name)}
                title={theme.name}
              ></button>
            </div>
          );
        })}
      </div>
    );
  };

  const componentThemesElement = getComponentThemes();
  const menuThemesElement = getMenuThemes();
  const configClassName = classNames("layout-config", {
    "layout-config-active": props.configActive
  });
  return (
    <div id="layout-config">
      <button
        type="button"
        id="layout-config-button"
        className="layout-config-button p-link"
        onClick={onConfigButtonClick}
      >
        <i className="pi pi-cog"></i>
      </button>
      {/* eslint-disable */}
      <div className={configClassName} onClick={props.onConfigClick}>
        {/* eslint-enable */}
        <h5>Menu Type</h5>
        <div className="p-field-radiobutton">
          <RadioButton
            name="menuMode"
            value="static"
            checked={props.menuMode === "static"}
            inputId="mode1"
            onChange={props.onMenuModeChange}
          ></RadioButton>
          <label htmlFor="mode1">Static</label>
        </div>
        <div className="p-field-radiobutton">
          <RadioButton
            name="menuMode"
            value="overlay"
            checked={props.menuMode === "overlay"}
            inputId="mode2"
            onChange={props.onMenuModeChange}
          ></RadioButton>
          <label htmlFor="mode2">Overlay</label>
        </div>
        <div className="p-field-radiobutton">
          <RadioButton
            name="menuMode"
            value="slim"
            checked={props.menuMode === "slim"}
            inputId="mode3"
            onChange={props.onMenuModeChange}
          ></RadioButton>
          <label htmlFor="mode3">Slim</label>
        </div>
        <hr />

        <h5>Color Scheme</h5>
        <div className="p-field-radiobutton">
          <RadioButton
            name="colorScheme"
            value="dark"
            checked={props.colorScheme === "dark"}
            inputId="theme1"
            onChange={changeColorScheme}
          ></RadioButton>
          <label htmlFor="theme1">Dark</label>
        </div>
        <div className="p-field-radiobutton">
          <RadioButton
            name="colorScheme"
            value="dim"
            checked={props.colorScheme === "dim"}
            inputId="theme2"
            onChange={changeColorScheme}
          ></RadioButton>
          <label htmlFor="theme2">Dim</label>
        </div>
        <div className="p-field-radiobutton">
          <RadioButton
            name="colorScheme"
            value="light"
            checked={props.colorScheme === "light"}
            inputId="theme3"
            onChange={changeColorScheme}
          ></RadioButton>
          <label htmlFor="theme3">Light</label>
        </div>

        <hr />

        <h5>Input Style</h5>
        <div className="p-field-radiobutton">
          <RadioButton
            inputId="input_outlined"
            name="inputstyle"
            value="outlined"
            checked={props.inputStyle === "outlined"}
            onChange={(e) => props.onInputStyleChange(e.value)}
          />
          <label htmlFor="input_outlined">Outlined</label>
        </div>
        <div className="p-field-radiobutton">
          <RadioButton
            inputIid="input_filled"
            name="inputstyle"
            value="filled"
            checked={props.inputStyle === "filled"}
            onChange={(e) => props.onInputStyleChange(e.value)}
          />
          <label htmlFor="input_filled">Filled</label>
        </div>

        <hr />

        <h5>Ripple Effect</h5>
        <InputSwitch
          checked={props.rippleActive}
          onChange={props.onRippleChange}
        />

        <hr />

        <h5>Menu Themes</h5>
        {menuThemesElement}

        <hr />

        <h5>Component Themes</h5>
        {componentThemesElement}
      </div>
    </div>
  );
};

export default AppConfig;
