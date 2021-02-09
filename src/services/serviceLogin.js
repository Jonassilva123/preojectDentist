import http from './http';

export class AuthLogin {
  static find = async (user, pass) => {
    try {
      const res = await http({
        method: 'post',
        url: '/login', 
        data: {
          email: user,
          password: pass,
        }
      })
      return res;
    } catch(err) {
      console.error(err);
    }
  }
}