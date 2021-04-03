import { databaseUrl } from "./database";

export const getTask = (id) => {
  return fetch(databaseUrl + id);
};

export const updateTask = (id, body) => {
  return fetch(databaseUrl + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
