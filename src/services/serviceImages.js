import http from './http';

export default class serviceImages {
  static find = async (id, data) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'post',
        url: `/images?clientId=${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: data
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
}
