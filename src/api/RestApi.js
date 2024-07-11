import Axios from 'axios';

export default Axios.create({
  baseURL: 'http://localhost:3000/',
});

// baseURL:"http://localhost:3300"

// baseURL: 'https://hemtejseafoodsapi.bloomitsolutions.in'
