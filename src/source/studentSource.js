import { studentRegisterApi, studentGetApi,activityLog } from '../apis/api';
import { studentRegisterPayload } from '../apis/payload';
import Request from 'superagent';

export const apiRegisterStudent = (requestData) => {
	console.log(requestData);
	return new Promise((resolve,reject) => {
	Request
      .post(studentRegisterApi)
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

export const apiGetAllStudent = () => {
	return new Promise((resolve,reject) => {
	Request
      .get(studentGetApi)
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

export const apiGetStudentDetail = (id) => {
  return new Promise((resolve,reject) => {
  Request
      .get(studentGetApi+'/'+id)
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



export const apiGetActivityLog = (id) => {
  return new Promise((resolve,reject) => {
  Request
      .get(activityLog+'?childId='+id)
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