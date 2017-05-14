import { parentsMetaApi, parentRegisterApi } from '../apis/api';
import Request from 'superagent';

export const apiparentsMeta = () => {
  return new Promise((resolve,reject) => {
  Request
      .get(parentsMetaApi)
      .type('application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
          } else {
          const result = JSON.parse(res.text);
          if (result.success == false){
             reject(err);
          }else{
            resolve(result);
          }
      }
    });
  });
};

export const apiRegisterParent = (requestData) => {
  console.log(requestData);
  return new Promise((resolve,reject) => {
  Request
      .post(parentRegisterApi)
      .send(requestData)
      .type('application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
          } else {
          const result = JSON.parse(res.text);
          if (result.success == false){
             reject(err);
          }else{
            resolve(result);
          }
      }
    });
  });
};

