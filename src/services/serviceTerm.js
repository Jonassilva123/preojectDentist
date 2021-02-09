import http from './http';

const FORM_ID = process.env.REACT_APP_FORM_ID;

export default class serviceAnswer {
  static find = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'get',
        url: `/terms?form=${FORM_ID}&client=${id}`,

        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  static create = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'post',
        url: '/terms',
        data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data.response;
    } catch (err) {
      console.log(err);
    }
  };

  static remove = async (termId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await http({
        method: 'delete',
        url: `/terms/${termId}`,
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
