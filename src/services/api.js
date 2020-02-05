import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCAtIE5hdGEuSG91c2UiLCJpYXQiOjk5OTk5OTk5OTk5OX0.6eG6WgVtRFPp9rwn-ophSUr-RqN9X4X5VEc8yhFmKd0'
  }
})

export default api
