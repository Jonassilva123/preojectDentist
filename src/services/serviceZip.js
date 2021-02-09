import axios from 'axios';

export class SearchZip {
  static find = async zip => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://brasilapi.com.br/api/cep/v1/${zip}`
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
}
