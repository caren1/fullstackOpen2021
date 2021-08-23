import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
}

 const savePerson = (person) => {
     const request = axios.post(baseUrl, person)
     return request.then((response) => response.data);
 }

 const removePerson = (id) => {
     const request = axios.delete(`${baseUrl}/${id}`);
     return request.then((response) => console.log(response.data));
 }

 const updatePerson = (id, updatedPerson) => {
     const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
     return request.then((response) => response.data);
 }

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllPersons, savePerson, removePerson, updatePerson }