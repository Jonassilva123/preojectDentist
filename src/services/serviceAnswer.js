import http from './http';

const FORM_ID = process.env.REACT_APP_FORM_ID;

export default class serviceAnswer {
  static find = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'get',
        url: id
          ? `/replys?form=${FORM_ID}&client=${id}`
          : `/replys?form=${FORM_ID}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  static listAnswer = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'get',
        url: `/answers?form=${FORM_ID}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data.response;
    } catch (err) {
      console.log(err);
    }
  };
}
