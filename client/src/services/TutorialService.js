import api from "./api";

export const useTutorialService = () => {

  const getAll = (page = 1, limit = 10, search = "") =>
    api.get(`/tutorials`, { params: { page, limit, search } });

  const getMyTutorials = (page = 1, limit = 10) =>
    api.get(`/tutorials/my`, { params: { page, limit } });

  const getOne = (id) => api.get(`/tutorials/${id}`);

  const create = (tutorial) => api.post(`/tutorials`, tutorial);

  const update = (id, tutorial) => api.put(`/tutorials/${id}`, tutorial);

  const remove = (id) => api.delete(`/tutorials/${id}`);

  return { getAll, getMyTutorials, getOne, create, update, remove };
};
