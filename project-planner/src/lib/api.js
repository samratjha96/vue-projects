import { databaseUrl } from './database'

export const getTask = (id) => {
    return fetch(databaseUrl + id)
}