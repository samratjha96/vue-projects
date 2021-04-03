export const url = "http://localhost:3000/tasks/";

export const addTask = (task) => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

export const getTask = (id) => {
  return fetch(url + id);
};

export const updateTask = (id, body) => {
  return fetch(url + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const deleteTask = (id) => {
  return fetch(url + id, {
    method: "DELETE",
  });
};

export const getAllTasks = () => {
  return fetch(url);
};
