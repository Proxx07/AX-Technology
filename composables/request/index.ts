import {$fetch} from "ofetch";

const $request = $fetch.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export default $request;