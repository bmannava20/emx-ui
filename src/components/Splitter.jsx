import "./Splitter.css";

import PropTypes from "prop-types";
import React, { useEffect } from "react";

const Splitter = ({ sidebarCollapsed, handleSideBarToggle, ...otherProps }) => {
  const iconClass = sidebarCollapsed ? "right" : "left";

  useEffect(() => {
    dragElement(otherProps.sideBarSplitterEleRef.current, "H");
  });

  const dragElement = (element, direction, handler) => {
    const drag = { x: 0, y: 0 };
    const delta = { x: 0, y: 0 };
    let activateStaticMenuDesktop = false;
    handler
      ? (handler.onmousedown = dragMouseDown)
      : (element.onmousedown = dragMouseDown);

    function dragMouseDown(e) {
      e.preventDefault();
      drag.x = e.clientX;
      drag.y = e.clientY;
      document.onmouseup = onMouseUp;
      document.onmousemove = onMouseMove;
    }

    function onMouseUp(e) {
      document.onmousemove = document.onmouseup = null;
    }

    function onMouseMove(e) {
      const currentX = e.clientX;
      const currentY = e.clientY;

      delta.x = currentX - drag.x;
      delta.y = currentY - drag.y;

      if (delta.x !== 0 && currentX <= window.innerWidth / 3) {
        let sideBar = currentX;
        //11px is the default hover width of the splitter in css. If we
        //change it there then we have to change it here as well
        let sideBarMenu = currentX - 11;
        let content = sideBar - 4;
        otherProps.sideBarEleRef.current.style.width = sideBar + "px";
        otherProps.sideBarMenuEleRef.current.style.width = sideBarMenu + "px";
        otherProps.mainContentEleRef.current.style.marginLeft = content + "px";

        if (sidebarCollapsed && !activateStaticMenuDesktop) {
          activateStaticMenuDesktop = true;
          document.getElementById("dummyButtonId").click();
        }
      }
    }
  };

  return (
    /*eslint-disable*/
    <div className="splitter" ref={otherProps.sideBarSplitterEleRef}>
      {/*eslint-enable*/}
      <div className="splitter-buttons">
        <i
          className={`pi pi-caret-${iconClass} splitter-icon`}
          onClick={handleSideBarToggle}
          title="expand"
          aria-hidden="true"
        ></i>
      </div>
      <button
        id="dummyButtonId"
        style={{ display: "none" }}
        onClick={otherProps.activateStaticMenuDesktop}
      />
    </div>
  );
};

Splitter.defaultProps = {
  sidebarCollapsed: true
};

Splitter.propTypes = {
  sidebarCollapsed: PropTypes.bool,
  handleSideBarToggle: PropTypes.func.isRequired
};

export default Splitter;
