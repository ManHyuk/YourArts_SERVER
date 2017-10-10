'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);
const transactionWrapper = require('./TransactionWrapper');

/*******************
  * like
  * @param  likeData = {user_idx, exhibition_idx, like_count}
  * @returns {Promise}
  ********************/
exports.like = (likeData) => {
  return new Promise((resolve, reject) => {
    transactionWrapper.getConnection(pool)
      .then(transactionWrapper.beginTransaction)
      .then((context) => {
        return new Promise((resolve, reject) => {

          const sql = "INSERT INTO YOURARTS.like set ?"; //평점을 평점테이블에 추가

          context.conn.query(sql, likeData, (err, rows) => {
            if (err) {
              context.error = err;
              reject(context)
            } else {
              if (rows.affectedRows === 1) { // 쓰기 시도 성공
                context.result = rows;
                resolve(context)
              } else {
                context.error = new Error("Like Post error");
                reject(context);
              }
            }
          })
        });
      })
      .then((context) => {
        return new Promise((resolve, reject) => {

               const sql =
                 `
                 UPDATE YOURARTS.exhibition
                 SET exhibition_count = exhibition_count + 1,
	                   exhibition_sum = exhibition_sum + ?
                 WHERE exhibition_idx = ?;
                 `;
          context.conn.query(sql, [likeData.like_count, likeData.exhibition_idx], (err, rows) => {
            if (err) {
              context.error = err;
              reject(context)
            } else {
              if (rows.affectedRows === 1) {
                resolve(context);
              } else {
                context.error = new Error("'Exhibition Update Error");
                reject(context);
              }
            }
          })
        })
      })
      .then((context) => {
        return new Promise((resolve, reject) => {

          const sql = "SELECT * FROM YOURARTS.like " +
                      "WHERE user_idx=? AND exhibition_idx=?";

          context.conn.query(sql, [likeData.user_idx, likeData.exhibition_idx], (err, rows) => {
            if (err) {
              context.error = err;
              reject(context)
            } else {
              context.result = rows[0];
              resolve(context)
            }
          })

        });
      })
      .then(transactionWrapper.commitTransaction)
      .then((context) => {
        context.conn.release();
        resolve(context.result);
      })
      .catch((context) => {
        context.conn.rollback(() => {
          context.conn.release();
          reject(context.error);
        })
      })
  });
};


 /*******************
   * heart
   * @param  heartData = {user_idx, exhibition_idx, heart_used}
   * @returns {Promise}
   ********************/
exports.heart = (heartData) => {
 return new Promise((resolve, reject) => {
    const sql = "SELECT exhibition_idx FROM heart "+
                 "WHERE user_idx=? AND exhibition_idx=?";

     pool.query(sql, [heartData.user_idx, heartData.exhibition_idx], (err, rows) => {
       if (err) {
         reject(err);
       } else {
         if (rows.length !== 0) {
           reject(1406);
         } else {
           resolve(null);
         }
       }
     });
   }
 ).then(() => {
      return new Promise((resolve, reject) => {

        const sql = "INSERT INTO heart set ?";

          pool.query(sql, heartData, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              if (rows.affectedRows === 1) {
                resolve(heartData);
              } else {
                const _err = new Error("Heart Post error");
                reject(_err);
              }
            }
        });
      });
    }
  ).then((result) => {
     return new Promise((resolve, reject) => {
       const sql = "SELECT * FROM heart " +
                   "WHERE user_idx=? AND exhibition_idx=?";

       pool.query(sql, [heartData.user_idx, heartData.exhibition_idx], (err, rows) => {
         if (err) {
           reject(err);
         } else {
           resolve(rows);
         }
       });
     });
   }
 );
};
