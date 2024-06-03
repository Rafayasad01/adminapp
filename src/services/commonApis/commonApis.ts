import axios from 'axios';

// const Countries: any = () => {
//   return axios.get(`https://restcountries.com/v3.1/all?fields=name`);
// };

const Countries: any = () => {
  return axios.get(`https://countriesnow.space/api/v0.1/countries`);
};

export default Countries;
