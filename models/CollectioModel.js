'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);
const jwt = require('jsonwebtoken');
const config = require('../config/config');


/*******************
 *  user의콜랙션조회
 *  @param: user_data = user_idx
 ********************/
exports.userCollection = (userData) => {
 return new Promise((resolve, reject) =>{

   const sql = "SELECT * FROM collection WHERE user_idx=?";

   pool.query(sql, userData, (err, rows) => {
     if (err) {
       reject(err);
     } else {
       resolve(rows);
     }
   });
 });
};

/*******************
 *  컬렉션작성(미리보기)
 *  @param: user_data = {user_idx, exhibition_idx, content, image, created}
 ********************/
 exports.workPost = (userData) => {
   return new Promise((resolve, reject) =>{

     const sql = "INSERT INTO collection set ?";

     pool.query(sql, userData, (err, rows) => {
       if (err) {
         reject(err);
       } else {
         resolve(rows);
       }
     });
   });
 };

 /*******************
  *  컬렉션작성(내가찍은사진)
  *  @param: user_data = {user_idx, exhibition_idx, content, image, created}
  ********************/
 exports.picturePost = (userData) => {
   return new Promise((resolve, reject) =>{

     const sql = "INSERT INTO collection set ?";

     pool.query(sql, userData, (err, rows) => {
       if (err) {
         reject(err);
       } else {
         resolve(rows);
       }
     });
   });
 };

 /*******************
  *  컬렉션상세조회
  *  @param: user_data = collection_idx
  ********************/
exports.detailCollection = (userData) => {
  return new Promise((resolve, reject) =>{

    const sql = "SELECT * FROM collection WHERE collection_idx = ?";

    pool.query(sql, [userData.collection_idx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//
/*******************
 *  컬렉션수정
 *  @param: user_data = {collection_idx, content, updated}}
 ********************/
exports.editCollection = (userData) => {
  return new Promise((resolve, reject) =>{

    const sql = "UPDATE collection SET collection_content=?, collection_updated=? WHERE collection_idx=?";

    pool.query(sql, [userData.content, userData.update, userData.collection_idx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
};

/*******************
 *  컬렉션삭제
 *  @param: user_data = collection_idx
 ********************/
exports.delCollection = (userData) => {
  return new Promise((resolve, reject) =>{
    const sql = "DELETE FROM collection WHERE collection_idx = ?";

    pool.query(sql, [userData.collection_idx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
};
