import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import GetDataService from "../service/GetDataService";
import UpdateDataService from "../service/UpdateDataService";
import { FormLayoutEdit } from "./FormLayoutEdit";
import { FormLayoutView } from "./FormLayoutView";

export const FormLayoutDemo = (props) => {
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(null);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const list = history.location.pathname.split("/");

    const curId = list[list.length - 1];
    const chapter = localStorage.getItem("chapter")
      ? JSON.parse(localStorage.getItem("chapter"))
      : null;
    const section = localStorage.getItem("section")
      ? JSON.parse(localStorage.getItem("section"))
      : null;
    const subSection = localStorage.getItem("subSection")
      ? JSON.parse(localStorage.getItem("subSection"))
      : null;

    const getDataService = new GetDataService();
    if (curId && chapter && curId == chapter.id) {
      getDataService.retrieveChapter(curId).then((data) => {
        setData(data);
      });
    } else if (curId && section && curId == section.id) {
      getDataService.retrieveSection(curId).then((data) => {
        setData(data);
      });
    } else if (curId && subSection && curId == subSection.id) {
      getDataService.retrieveSubsection(curId).then((data) => {
        setData(data);
      });
    }
  }, [history.location]);

  useEffect(() => {
    //console.log('history.location.state',history.location.state,history);
  }, [history.location.state]);

  const onDelete = () => {
    const getDataService = new GetDataService();

    if (data && data.typeIdentifier === "CHAPTER") {
      localStorage.clear();
      getDataService.deleteChapter(data.id).then((data) => {
        console.log("chapter", data);
        //props.onDispatch("GetData");
        // setDisplayConfirmation(false);
        setTimeout(() => {
          history.go(0);
        }, 2000);
      });
    }
    if (data && data.typeIdentifier === "SECTION") {
      localStorage.setItem("section", "");
      getDataService.deleteSection(data.id).then((data) => {
        console.log("section", data);
        //props.onDispatch("GetData");
        //setDisplayConfirmation(false);
        setTimeout(() => {
          history.go(0);
        }, 2000);
      });
    }
    if (data && data.typeIdentifier === "SUBSECTION") {
      localStorage.setItem("subSection", "");
      getDataService.deleteSubsection(data.id).then((data) => {
        console.log("subsection", data);
        //props.onDispatch("GetData");
        //setDisplayConfirmation(false);
        setTimeout(() => {
          history.go(0);
        }, 2000);
      });
    }
  };
  const submitEditFormData = (data) => {
    const {
      id,
      chapter,
      title,
      tagtext,
      shortDesc,
      resourceLink,
      description,
      company,
      section,
      file
    } = data;
    const updateDataService = new UpdateDataService();
    const companyData = typeof company == "string" ? { id: company } : company;
    const chapterData = typeof chapter == "string" ? { id: chapter } : chapter;
    const sectionData = typeof section == "string" ? { id: section } : section;
    if (data && data.typeIdentifier === "CHAPTER") {
      updateDataService
        .updateChapterData(
          {
            id,
            title,
            tagtext,
            shortDesc,
            resourceLink,
            description,
            company: companyData
          },
          file
        )
        .then((res) => {
          console.log(props);
          props.onDispatch("GetData");
        });
    }
    if (data && data.typeIdentifier === "SECTION") {
      updateDataService
        .updateSectionData(
          {
            id,
            title,
            tagtext,
            shortDesc,
            resourceLink,
            description,
            company: companyData,
            chapter: chapterData
          },
          file
        )
        .then((data) => {
          props.onDispatch("GetData");
        });
    }
    if (data && data.typeIdentifier === "SUBSECTION") {
      updateDataService
        .updateSubSectionData(
          {
            id,
            title,
            tagtext,
            shortDesc,
            resourceLink,
            description,
            company: companyData,
            section: { ...sectionData, chapter: chapterData }
          },
          file
        )
        .then((data) => {
          props.onDispatch("GetData");
        });
    }
  };
  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: message.title,
      detail: message.description,
      life: 3000
    });
  };

  const showErrorMsg = (data, type) => {
    const {
      section,
      chapter,
      title,
      shortDesc,
      resourceLink,
      description,
      company
    } = data;

    if (!title) {
      showError({
        title: `${type}  required field`,
        message: "Please enter title !!"
      });
      return true;
    } else if (!company) {
      showError({
        title: "Company required",
        message: "Please enter Company!!"
      });
      return true;
    } else if ((type == "Section" || type == "SubSection") && !chapter) {
      showError({
        title: "Chapter is required ",
        message: "Please enter Chapter id !!"
      });
      return true;
    } else if (type == "SubSection" && !section) {
      showError({
        title: "Section required ",
        message: "Please enter Section id !!"
      });
      return true;
    } else if (!shortDesc) {
      showError({
        title: "Short Desc required ",
        message: "Please enter Short Description !!"
      });
      return true;
    }

    return false;
  };

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div>
          <div className="p-fluid p-formgrid p-grid">
            <h5 className="p-field p-col-12 p-md-8">
              {data && data.title}{" "}
              {data && data.company && data.company.companyId}
            </h5>
            <div className="p-field p-md-2">
              <Button
                disabled={!data}
                style={{ opacity: !data ? 0.5 : 1 }}
                id="delete"
                label="Delete"
                onClick={() => {
                  setDisplayConfirmation(!displayConfirmation);
                }}
              ></Button>
            </div>
            <div className="p-field p-md-2">
              {!isEdit ? (
                <Button
                  disabled={!data}
                  style={{ opacity: !data ? 0.5 : 1 }}
                  id="edit"
                  label="Edit"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                ></Button>
              ) : (
                <Button
                  className={!data && "opacity-blur"}
                  disabled={!data}
                  id="action"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                  label="Cancel"
                ></Button>
              )}
            </div>
          </div>

          {isEdit ? (
            <FormLayoutEdit data={data} setData={setData} />
          ) : (
            <FormLayoutView data={data} />
          )}
          <div className="p-fluid p-formgrid p-grid p-row">
            <div
              className="p-field"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <div className="p-lg-2 p-col-4">
                {!isEdit ? "" : <Button id="reset" label="Reset"></Button>}
              </div>
              <div className="p-lg-2 p-col-4">
                {!isEdit ? "" : <Button id="cancel" label="Cancel"></Button>}
              </div>
              <div className="p-lg-2 p-col-4">
                {!isEdit ? (
                  ""
                ) : (
                  <Button
                    id="submit"
                    label="Submit"
                    onClick={() => {
                      if (!showErrorMsg(data, data.typeIdentifier)) {
                        submitEditFormData(data);
                      }
                    }}
                  ></Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        header="EmpowerMX"
        visible={displayConfirmation}
        modal
        style={{ width: "350px" }}
        footer={
          <div>
            <Button
              label="No"
              className="p-1"
              onClick={() => {
                setDisplayConfirmation(false);
              }}
            />
            {/* eslint-disable */}
            <Button
              label="Yes"
              className="p-1"
              onClick={() => {
                onDelete();
              }}
              autoFocus
            />
            {/* eslint-enable */}
          </div>
        }
        onHide={() => {
          setDisplayConfirmation(false);
        }}
      >
        <div className="confirmation-content">
          <span className="alignText">Are you sure you want to proceed?</span>
        </div>
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
};
