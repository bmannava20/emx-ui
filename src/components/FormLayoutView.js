import React, { useEffect, useState } from "react";

import TextEditor from "./TextEditor";

export const FormLayoutView = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({ ...props.data });
  }, [props]);

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12">
              <label>{data && data.shortDesc}</label>
            </div>
          </div>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-12">
              {data && data.resourceLink && (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video key={props.data.id} controls>
                  {[data.resourceLink].map(function (srcUrl, index) {
                    return <source key={index} src={srcUrl}></source>;
                  })}
                </video>
              )}
            </div>
          </div>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12">
              <TextEditor
                className={"form-control"}
                data={props.data}
                key={props.data && props.data.id}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
