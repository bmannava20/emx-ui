import axios from "./index";

export default class GetDataService {
  getSidebarData(id) {
    return axios.get(`/contents`).then((res) => res.data);
    //return axios.get(`/contents/${id}`).then((res) => res.data);
    // set company_id in header and remove id from here. user_id can be something like 'emx'
  }

  getChapterDropDwnData(companyId) {
    return axios.get(`/getChaptersForCompany`).then((res) => res.data);
  }

  getSectionDropDwnData(chapterId, companyId) {
    return axios
      .get(`/getSectionsForChapter/${chapterId}`)
      .then((res) => res.data);
  }

  retrieveChapter(id) {
    return axios.get(`/retrieveChapter/${id}`).then((res) => res.data);
  }

  retrieveSection(id) {
    return axios.get(`/retrieveSection/${id}`).then((res) => res.data);
  }

  retrieveSubsection(id) {
    return axios.get(`/retrieveSubsection/${id}`).then((res) => {
      let subsection = res.data;
      subsection.chapter = res.data.section.chapter;
      return subsection;
    });
  }

  //delete
  deleteChapter(id) {
    return axios.delete(`/deleteChapter/${id}`).then((res) => res.data);
  }

  deleteSection(id) {
    return axios.delete(`/deleteSection/${id}`).then((res) => res.data);
  }

  deleteSubsection(id) {
    return axios.delete(`/deleteSubsection/${id}`).then((res) => res.data);
  }

  deleteChapterVideo(id) {
    return axios.delete(`/deleteChapterResource/${id}`).then((res) => res.data);
  }

  deleteSectionVideo(id) {
    return axios.delete(`/deleteSectionResource/${id}`).then((res) => res.data);
  }

  deleteSubsectionVideo(id) {
    return axios
      .delete(`/deleteSubsectionResource/${id}`)
      .then((res) => res.data);
  }
}
