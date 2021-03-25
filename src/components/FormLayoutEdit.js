import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import GetDataService from "../service/GetDataService";
import TextEditor from "./TextEditor";

export const FormLayoutEdit = (props) => {
  const history = useHistory();
  const toast = useRef(null);
  const [dropdownItem, setDropdownItem] = useState("");
  const [file, setFile] = useState(null);
  const [companyData, setCompanyData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [onVidDelete, setOnVidDelete] = useState(false);
  const uploadHandler = ({ files }) => {
    const [file] = files;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(e.target.result);
      // setFile(e.target.result);
      props.setData({ ...props.data, file: file });
    };

    if (file) {
      fileReader.readAsBinaryString(file);
    }
  };

  const onUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
      life: 3000
    });
  };

  useEffect(() => {
    const getDataService = new GetDataService(
      process.env.TRAINING_APP_BASE_URL
    );
    getDataService
      .getSidebarData("JOR")
      .then((data) => {
        setCompanyData(data.companies);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    setDropdownItem(props.data && props.data.company);
    props.setData(props.data);
  }, [props]);

  useEffect(() => {
    if (
      props.data &&
      (props.data.typeIdentifier == "SECTION" ||
        props.data.typeIdentifier == "SUBSECTION") &&
      props.data.company
    ) {
      const getDataService = new GetDataService();
      getDataService
        .getChapterDropDwnData(props.data.company.id)
        .then((res) => {
          return res.map((item) => {
            item.label = item.title;
            item.value = item.id;
            return item;
          });
        })
        .then((res) => {
          setChapterData([...res]);
        });
    }
  }, [props.data && props.data.company]);

  useEffect(() => {
    if (
      props.data &&
      props.data.typeIdentifier == "SUBSECTION" &&
      props.data.chapter &&
      props.data.company
    ) {
      const getDataService = new GetDataService();
      getDataService
        .getSectionDropDwnData(
          props.data.chapter && props.data.chapter.id
            ? props.data.chapter.id
            : props.data.chapter,
          props.data.company.id
        )
        .then((res) => {
          return res.map((item) => {
            item.label = item.title;
            item.value = item.id;
            return item;
          });
        })
        .then((res) => {
          setSectionData([...res]);
        });
    }
  }, [props.data && props.data.chapter]);

  const deleteVideoResouce = () => {
    if (props.data && props.data.typeIdentifier == "CHAPTER") {
      const getDataService = new GetDataService();
      getDataService.deleteChapterVideo(props.data.id).then((res) => {
        console.log(res);
        // history.go(0);
        setSectionData(res);
        props.setData(res);
        setOnVidDelete(false);
      });
    }
    if (props.data && props.data.typeIdentifier == "SECTION") {
      const getDataService = new GetDataService();
      getDataService.deleteSectionVideo(props.data.id).then((res) => {
        console.log(res);
        // history.go(0);
        props.setData(res);
        setOnVidDelete(false);
      });
    }
    if (props.data && props.data.typeIdentifier == "SUBSECTION") {
      const getDataService = new GetDataService();
      getDataService.deleteSubsectionVideo(props.data.id).then((res) => {
        console.log(res);
        // history.go(0);
        props.setData(res);
        setOnVidDelete(false);
      });
    }
  };

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-2 center">
              <label htmlFor="tittle">Title</label>
            </div>
            <div className="p-field p-col-10">
              {" "}
              <InputText
                className={
                  "form-input-ctrl required-field form-control p-inputtext-height"
                }
                id="tittle"
                type="text"
                value={props.data && props.data.title}
                onChange={(e) => {
                  props.setData({ ...props.data, title: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-2 center">
              {" "}
              <label htmlFor="companyID">Company</label>
            </div>
            <div className="p-field p-col-10">
              <Dropdown
                id="companyID"
                className={"form-input-ctrl required-field form-control"}
                value={props.data && props.data.company}
                options={companyData}
                onChange={(e) => {
                  props.setData({ ...props.data, company: e.value });
                }}
                optionLabel="name"
                placeholder="Select One"
              ></Dropdown>
            </div>
          </div>
          {((props.data && props.data.typeIdentifier === "SECTION") ||
            props.data.typeIdentifier === "SUBSECTION") && (
            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col-2 center">
                <label htmlFor="chapter"> Chapter </label>
              </div>
              <div className="p-field p-col-10">
                <Dropdown
                  id="chapter"
                  value={
                    props.data && props.data.chapter && props.data.chapter.id
                      ? props.data.chapter.id
                      : props.data.chapter
                  }
                  className={"form-input-ctrl required-field form-control"}
                  options={[...chapterData]}
                  onChange={(e) => {
                    props.setData({ ...props.data, chapter: e.value });
                  }}
                  optionLabel="title"
                  placeholder="Select One"
                ></Dropdown>
              </div>
            </div>
          )}

          {props.data && props.data.typeIdentifier === "SUBSECTION" && (
            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col-2 center">
                <label htmlFor="section"> Section </label>
              </div>
              <div className="p-field p-col-10">
                <Dropdown
                  id="section"
                  value={
                    props.data && props.data.section && props.data.section.id
                      ? props.data.section.id
                      : props.data.section
                  }
                  className={"form-input-ctrl required-field form-control"}
                  options={[...sectionData]}
                  onChange={(e) => {
                    props.setData({ ...props.data, section: e.value });
                  }}
                  optionLabel="title"
                  placeholder="Select One"
                ></Dropdown>
              </div>
            </div>
          )}
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-2 center">
              <label htmlFor="shortDesc">Short Description</label>{" "}
            </div>
            <div className="p-field p-col-10">
              <InputTextarea
                id="shortDesc"
                rows="4"
                className={"form-control required-field"}
                value={props.data && props.data.shortDesc}
                onChange={(e) => {
                  props.setData({ ...props.data, shortDesc: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-2 center">
              <label htmlFor="videoLink">Video Link</label>
            </div>
            <div className="p-field p-col-10">
              <FileUpload
                name="demo[]"
                customUpload={true}
                uploadHandler={uploadHandler}
                auto={true}
                emptyTemplate={
                  <div>
                    {props.data.resourceLink && (
                      <>
                        {/* eslint-disable */}
                        {props.data && props.data.resourceLink && (
                          // eslint-disable-next-line jsx-a11y/media-has-caption
                          <video key={props.data.id} controls>
                            {[props.data.resourceLink].map(function (
                              srcUrl,
                              index
                            ) {
                              return <source key={index} src={srcUrl}></source>;
                            })}
                          </video>
                        )}
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setOnVidDelete(true);
                          }}
                        >
                          <i className="pi pi-trash p-mr-2 p-1"></i>
                        </div>
                        {/* eslint-enable */}
                      </>
                    )}
                  </div>
                }
                onUpload={onUpload}
                accept="video/*"
                maxFileSize={100000000}
              />
            </div>
          </div>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-2 center">
              <label htmlFor="tagText">Tag text/Names</label>
            </div>
            <div className="p-field p-col-10">
              {" "}
              <InputTextarea
                rows="5.5"
                id="tagtext"
                className={"form-control"}
                value={props.data && props.data.tagtext}
                onChange={(e) => {
                  props.setData({ ...props.data, tagtext: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="p-fluid p-formgrid p-grid ">
            <div className="p-field p-col-2 top">
              <label htmlFor="longDesc">Long Description</label>
            </div>
            <div className="p-field p-col-10">
              <TextEditor
                id="longDesc"
                key={props.data.id}
                className={"form-control"}
                data={props.data}
                setData={props.setData}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        header="EmpowerMX"
        visible={onVidDelete}
        modal
        onHide={() => setOnVidDelete(false)}
        style={{ width: "350px" }}
        footer={
          <div>
            <Button
              label="No"
              className="p-1"
              onClick={() => {
                setOnVidDelete(false);
              }}
            />
            <Button
              label="Yes"
              className="p-1"
              onClick={() => {
                deleteVideoResouce();
              }}
            />
          </div>
        }
      >
        <div className="confirmation-content">
          <span className="alignText">Are you sure you want to proceed?</span>
        </div>
      </Dialog>
    </div>
  );
};
