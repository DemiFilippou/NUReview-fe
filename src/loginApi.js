// web requests go here
import {API_ROOT} from './api-config';
import api from './api';

export default class LoginApi {
  /****************** User functions ******************/

  // adds a user
  static register(user_params) {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await fetch(`${API_ROOT}/users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user_params)
        });
      } catch (err) {
        return reject(err);
      }

      const resJson = await res.json();
      if (res.ok) {
        localStorage.setItem('nureviewtoken', resJson.token);
        api.defaults.headers.common['Authorization'] = resJson.token;
        return resolve(true);
      }
      return reject(resJson.message);
    });
  }

  // logs a user in with the given params
  static login(user_params) {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await fetch(`${API_ROOT}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user_params)
        });
      } catch (err) {
        return reject(err);
      }

      const resJson = await res.json();
      if (res.ok) {
        api.defaults.headers.common['Authorization'] = resJson.token;
        return resolve(true);
      }
      return reject(resJson.message);
    });
  }

  /****************** Review functions ******************/
}
