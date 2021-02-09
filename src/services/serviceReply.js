import http from './http';

export default class Reply {
  static create = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await http({
        method: 'post',
        url: '/reply',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  static search = async (formId, clientId) => {
    try {
      const token = localStorage.getItem('token');
      console.log(clientId);
      const response = await http({
        method: 'get',
        url: `/replys?form=${formId}&client=${clientId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  static remove = async (replyId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await http({
        method: 'delete',
        url: `/reply/${replyId}`,
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
