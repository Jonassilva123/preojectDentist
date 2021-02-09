import http from './http';

export default class User {
  static create = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'post',
        url: '/users',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          role: data.role
        }
      });

      return res;
    } catch (err) {
      return console.error(err);
    }
  };

  static find = async (page, limit) => {
    try {
      const token = localStorage.getItem('token');
      const response = await http({
        method: 'get',
        url:
          !page && !limit ? '/users' : `/users?offset=${page}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      if (err.response.data.error === 'Token invalid') {
        localStorage.clear();
        alert('Acesso expirado!', window.location.reload());
      }
    }
  };

  static search = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'get',
        url: `/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      if (err.response && err.response.data.error === 'Token invalid') {
        localStorage.clear();
      }
    }
  };

  static delete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'delete',
        url: `/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  static update = async (id, data) => {
    const token = localStorage.getItem('token');
    const res = await http({
      method: 'put',
      url: `/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    });

    return res.data;
  };
}
