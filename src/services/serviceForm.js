import http from './http';

const FORM_ID = process.env.REACT_APP_FORM_ID;
export default class Form {
  static find = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await http({
        method: 'get',
        url: `questions?form_id=${FORM_ID}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
}
