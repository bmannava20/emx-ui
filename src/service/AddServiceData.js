import axios from "./index";

export default class AddServiceData {
  addChapterData(data, file) {
    let formData = new FormData();
    formData.append("chapter", JSON.stringify(data));
    formData.append("file", file);
    return axios.post(`/addChapter`, formData).then((res) => res.data);
  }

  addSectionData(data, file) {
    let formData = new FormData();
    formData.append("section", JSON.stringify(data));
    formData.append("file", file);
    return axios.post(`/addSection`, formData).then((res) => res.data);
  }

  addSubsectionData(data, file) {
    let formData = new FormData();
    formData.append("subsection", JSON.stringify(data));
    formData.append("file", file);
    return axios.post(`/addSubsection`, formData).then((res) => res.data);
  }
}
