import http from './http';

export default class serviceDashboard {
  static find = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await http({
        method: 'get',
        url: '/dashboard',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      if (err.response.data.error === 'Token invalid') {
        localStorage.clear();
        return window.location.reload();
      }
    }
  };
}
