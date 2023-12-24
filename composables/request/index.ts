import {$fetch, $Fetch} from "ofetch";

const $request: $Fetch = $fetch.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export default $request;
