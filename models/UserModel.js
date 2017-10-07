'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const jwt = require('jsonwebtoken');
const config = require('../config/config');

/*******************
 *  Register
 *  @param: userData = {id, pw, nickname}
 ********************/
exports.register = (userData) => {
  return new Promise((resolve, reject) => {
      const sql = "SELECT user_id FROM user WHERE user_id = ?";

      pool.query(sql, [userData.id], (err, rows) => {  // 아이디 중복 체크
        if (err) {
          reject(err);
        } else {
          if (rows.length !== 0) {  // 이미 아이디 존재
            reject(1401);
          }else{
            resolve(null);
          }
        }
      });
    }
  ).then(() => {
      return new Promise((resolve, reject) => {
        const sql =
          "INSERT INTO user(user_id, user_pw, user_nickname) " +
          "VALUES (?, ?, ?) ";


        pool.query(sql, [userData.id, userData.pw, userData.nickname], (err, rows) => {  // 가입 시도
          if (err) {
            reject(err);
          } else {
            if (rows.affectedRows === 1) {
              resolve(rows);
            } else {
              const _err = new Error("User Register Custom error");
              reject(_err);
            }
          }
        });
      });
    }
  ).then((result) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT user_idx, user_id, user_nickname, user_created " +
        "FROM user " +
        "WHERE user_idx = ?";

      pool.query(sql, result.insertId, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

exports.check = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT user_id FROM user WHERE user_id =?';

    pool.query(sql, userData, (err, rows) => {
      if (err){
        reject(err);
      } else {
        if (rows.length !==0) {
          reject(1401)
        } else{
          resolve(rows);
        }
      }
    });
  });
};

/*******************
 *  Login
 *  @param: userData = {id, pw}
 ********************/
exports.login = (userData) => {
  return new Promise((resolve, reject) => {
      const sql = "SELECT user_id FROM user WHERE user_id = ?";

      pool.query(sql, [userData.id], (err, rows) => {  // 아이디 존재 검사
        if (err) {
          reject(err);
        } else {
          if (rows.length === 0) {  // 아이디 없음
            reject(1402);
          } else {
            resolve(null);
          }
        }
      });
    }
  ).then(() => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT user_id, user_nickname " +
        "FROM user " +
        "WHERE user_id = ? and user_pw = ?";

      pool.query(sql, [userData.id, userData.pw], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.length === 0) {  // 비밀번호 틀림
            reject(1403);
          } else {
            const profile = {
              id: rows[0].user_id,
              nickname: rows[0].user_nickname
            };
            const token = jwt.sign(profile, config.jwt.cert, {'expiresIn': "10h"});

            const result = {
              profile,
              token
            };
            resolve(result);
          }
        }
      });
    });
  });
};


exports.profile = (userData) => {
  return new Promise((resolve, reject) =>{
    const sql =
      "SELECT user_idx, user_id, user_nickname, user_created " +
      "FROM user " +
      "WHERE user_idx = ?";

    pool.query(sql, userData, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
};























