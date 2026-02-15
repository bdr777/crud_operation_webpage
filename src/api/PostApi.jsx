import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getApi=()=>{
    return api.get("/posts");
}

export const deleteApi=(id)=>{
  return api.delete(`/posts/${id}`);
}

export const postApi=(addData)=>{
  return api.post("/posts",addData);
}

export const updateApi=(id,post)=>{
  return api.put(`/posts/${id}`,post);
}