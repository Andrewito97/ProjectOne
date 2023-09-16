import fetch from 'node-fetch';
import getDomain from '../helpers/getDomain.helper';

const domain = getDomain();  

const otherApi = {
  async sendToSupport(mail) {
    try {
      const response = await fetch(`${domain}/myapi/support`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mail)
      });
      return response.json();
    }
    catch (error) {
      console.log(error);
    }
  }
};

export default otherApi;
