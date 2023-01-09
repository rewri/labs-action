import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/v1/',
  // baseURL: 'http://localhost:3050/api/v1/',
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Basic YXBpS2V5OllwN3l6QVprQjcyZGRq'
  }
});
