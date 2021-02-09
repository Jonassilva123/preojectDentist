import http from './http';

export default class serviceTusks {
  static find = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'get',
        url: `/tusks?clientId=${id}`,
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
        url: `/tusks`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: data
      });
      console.log('try', res);

      return res.data;
    } catch (error) {
      const res = error.response.data.error;
      console.log('catch', res);
      return res;
    }
  };
  static delete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'delete',
        url: `/tusks/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
}
