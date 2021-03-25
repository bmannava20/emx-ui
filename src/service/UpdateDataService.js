import axios from "./index";

export default class UpdateDataService {
  updateChapterData(data, file) {
    let formData = new FormData();
    formData.append("chapter", JSON.stringify(data));
    formData.append("file", file);
    return axios.put(`/updateChapter`, formData).then((res) => res.data.data);
  }

  updateSectionData(data, file) {
    let formData = new FormData();
    formData.append("section", JSON.stringify(data));
    formData.append("file", file);
    return axios.put(`/updateSection`, formData).then((res) => res.data.data);
  }

  updateSubSectionData(data, file) {
    let formData = new FormData();
    formData.append("subsection", JSON.stringify(data));
    formData.append("file", file);
    return axios
      .put(`/updateSubsection`, formData)
      .then((res) => res.data.data);
  }
}
