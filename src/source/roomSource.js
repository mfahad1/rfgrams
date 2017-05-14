import { roomsGetApi, GetFieldsapi, roomRegisterApi } from '../apis/api';
import Request from 'superagent';

export const apiGetFields = () => {
  return new Promise((resolve,reject) => {
  Request
      .get(GetFieldsapi)
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

export const apiRegisterRoom = (requestData) => {
  console.log(requestData);
  return new Promise((resolve,reject) => {
  Request
      .post(roomRegisterApi)
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


export const apiGetAllRooms = () => {
	return new Promise((resolve,reject) => {
	Request
      .get(roomsGetApi)
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
