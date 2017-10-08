'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);
// const jwt = require('jsonwebtoken');
// const config = require('../config/config');


/*******************
 *  user의콜랙션조회
 *  @param: user_idx
 ********************/
exports.userCollection = (userIdxData) => {
 return new Promise((resolve, reject) =>{
   const sql =
     `
     SELECT
       collection_idx,
       user_idx,
       exhibition_idx,
       collection_content,
       collection_image
     FROM collection
     WHERE user_idx=?;
     `;

   pool.query(sql, userIdxData, (err, rows) => {
     if (err) {
       reject(err);
     } else {
       resolve(rows);
     }
   })
 });
};

/*******************
 *  컬렉션작성
 *  @param: collectionData = {user_idx, exhibition_idx, content, image, created}
 ********************/
 exports.collectionPost = (collectionData) => {
   return new Promise((resolve, reject) =>{

     const sql = "INSERT INTO collection set ?";

     pool.query(sql, collectionData, (err, rows) => {
       if (err) {
         reject(err);
       } else {
         resolve(rows);
       }
     })
   });
 };

 /*******************
  *  컬렉션상세조회
  *  @param: collectionData = collection_idx
  ********************/
exports.detailCollection = (collectionIdxData) => {
  return new Promise((resolve, reject) => {

    const sql =
      `
      SELECT
        collection_idx,
        user_idx,
        exhibition_idx,
        collection_content,
        collection_image
      FROM collection
      WHERE collection_idx=?;
      `;

    pool.query(sql, collectionIdxData, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    })
  });
};

//
/*******************
 *  컬렉션수정
 *  @param: collectionData = {collection_idx, content}}
 ********************/
exports.editCollection = (collectionEditData) => {
  return new Promise((resolve, reject) =>{

    const sql = "UPDATE collection SET collection_content=? WHERE collection_idx=?";

    pool.query(sql, [collectionEditData.content, collectionEditData.collection_idx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
};

/*******************
 *  컬렉션삭제
 *  @param: collectionData = collection_idx
 ********************/
exports.delCollection = (collectionIdxData) => {
  return new Promise((resolve, reject) =>{
    const sql = "DELETE FROM collection WHERE collection_idx=?";

    pool.query(sql, collectionIdxData, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
};
