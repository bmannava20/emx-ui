import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
const AppSearch = (props) => {
  const [onSelect, setOnSelect] = useState(null);
  let searchInputEl = null;
  function setValue(e) {
    setOnSelect(e);
    console.log(e, "select");
  }

  const ChapaterContent = (
    <div className="p-field p-col-12 p-md-6">
      <label htmlFor="chapterSearch">Chapter</label>
      <InputText
        id="chapterSearch"
        rows="5.5"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
    </div>
  );

  const SectionContent = (
    <div className="p-field p-col-12 p-md-6">
      <label htmlFor="sectionSearch">Section</label>
      <InputText
        id="sectionSearch"
        rows="5.5"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
    </div>
  );

  const SubSectionContent = (
    <div className="p-field p-col-12 p-md-6">
      <label htmlFor="subSectionSearch">SubSection</label>
      <InputText
        id="subSectionSearch"
        rows="5.5"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
    </div>
  );

  const getContent = () => {
    switch (onSelect) {
      case "Chapter":
        return ChapaterContent;
      case "Section":
        return SectionContent;
      case "SubSection":
        return SubSectionContent;
      default:
        return "";
    }
  };
  return (
    <div className="layout-search">
      {/* <CSSTransition className="search-container" timeout={{ enter: 400, exit: 400 }} in={props.searchActive} unmountOnExit onEnter={onEnter}>
                <div className="search-container" onClick={props.onSearchClick}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <RadioButton value="Chapter" name="chapter" onChange={(e) => setValue(e.value)} /> &nbsp;&nbsp;Chapter1 &nbsp;&nbsp;&nbsp;
                            <RadioButton value="Section" name="section" onChange={(e) => setValue(e.value)} /> &nbsp;&nbsp;Section1 &nbsp;&nbsp;&nbsp;
                            <RadioButton value="SubSection" name="subsection" onChange={(e) => setValue(e.value)} /> &nbsp;&nbsp; SubSection1
                        </div>
                        {getContent()}
                    </div>
                </div>
            </CSSTransition>*/}
    </div>
  );
};

export default AppSearch;
