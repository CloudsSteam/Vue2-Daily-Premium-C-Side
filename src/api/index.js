import Axios from 'axios';
import baseURL, { URLS } from './URLS';

const appkey = 'Cloudsteam_1650805183519';

const request = Axios.create({
  baseURL, // : 'https://mallapi.duyiedu.com/goods/'
  params: {
    appkey,
  },
});
// 拦截器
request.interceptors.response.use((value) => value.data);

const getSideList = (type) => request.get(
  URLS.getSide,
  { params: { type } },
);
export default {
  getSideList,
};
