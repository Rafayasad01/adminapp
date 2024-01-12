import axios from 'axios';

const Countries: any = () => {
  return axios.get(`https://restcountries.com/v3.1/all?fields=name`);
};

export default Countries;
