import http from './http';

export default class Client {
  static find = async (page, limit) => {
    try {
      const token = localStorage.getItem('token');
      const response = await http({
        method: 'get',
        url:
          !page && !limit
            ? '/clients'
            : `/clients?offset=${page}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      if (err.response.data.error === 'Token invalid') {
        alert('Acesso expirado!');
        localStorage.clear();
        return window.location.reload();
      }
    }
  };

  static list = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await http({
        method: 'get',
        url: '/clients',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data.clients;
    } catch (err) {
      console.error(err);
    }
  };

  static search = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await http({
        method: 'get',
        url: `/clients/search?id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  static create = async (data) => {
    const token = localStorage.getItem('token');

    try {
      const res = await http({
        method: 'post',
        url: '/clients',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          document: parseInt(data.document),
          genre: data.genre,
          birth: data.birth,
          email: data.email,
          phones: [{ one: data.phoneOne, two: data.phoneTwo }],
          father: data.father,
          mother: data.mother,
          place: [
            {
              cep: parseInt(data.zip),
              street: data.street,
              neighborhood: data.neighborhood,
              number: parseInt(data.number),
              complement: data.complement,
              city: data.city,
              state: data.state
            }
          ],
          bondsman: {
            document: data.bondsman.document,
            name: data.bondsman.name
          }
        }
      });
      return res.data;
    } catch (err) {
      return err.response.data.error;
    }
  };

  static update = async (data, id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'put',
        url: `/clients/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          genre: data.genre,
          document: parseInt(data.document),
          birth: data.birth,
          email: data.email,
          phones: [{ one: data.phoneOne, two: data.phoneTwo }],
          father: data.father,
          mother: data.mother,
          place: [
            {
              cep: parseInt(data.zip),
              street: data.street,
              neighborhood: data.neighborhood,
              number: parseInt(data.number),
              complement: data.complement,
              city: data.city,
              state: data.state
            }
          ],
          bondsman: {
            parent: data.bondsman.parent,
            document: data.bondsman.document,
            name: data.bondsman.name
          }
        }
      });

      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  static delete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await http({
        method: 'delete',
        url: `/clients/${id}`,
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
