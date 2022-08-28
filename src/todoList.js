import axios from "axios";

export const getTodoList = () => {
  return axios.get("http://localhost:3001/todos");
};
export const addTodoData = (data) => {
  return axios.post("http://localhost:3001/todos", data);
};
export const deleteTodoData = (data) => {
  return axios.delete(`http://localhost:3001/todos/${data}`);
};
export const updateTodoData = (data) => {
  console.log(data);
  return axios.patch(`http://localhost:3001/todos/${data.id}`, {
    content: data.content,
  });
};

export default getTodoList;
