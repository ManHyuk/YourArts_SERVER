'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);
const date = new Date();

/******
 * watch 조회
 * @param searchData
 * @param watchData
 * @returns {Promise}
 */

 exports.watch = (watchData) => {
   return new Promise((resolve, reject) => {
     const sql =
       `
       SELECT
         e.exhibition_name,
         e.exhibition_picture,
         date_format(convert_tz(exhibition_start_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_stard_date,
         date_format(convert_tz(exhibition_end_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_end_date,
         like.like_count
       FROM YOURARTS.like
       NATURAL JOIN YOURARTS.exhibition AS e
       WHERE like.user_idx=?
       ORDER BY like.like_count DESC, e.exhibition_name;
       `;

         pool.query(sql, watchData, (err, rows) => {
           if (err) {
             reject(err);
           } else {
             resolve(rows);
           }
         })

   });
 };




/*exports.watch = (watchData) => {
  return new Promise((resolve, reject) => {

    const sql =
      `
      SELECT
        exhibition.exhibition_name,
        exhibition.exhibition_picture,
        exhibition.exhibition_start_date,
        exhibition.exhibition_end_date,
        like.like_count
      FROM YOURARTS.like
      NATURAL JOIN YOURARTS.exhibition
      WHERE like.user_idx=?
      ORDER BY like.like_count DESC;
      `;

    pool.query(sql, watchData, (err, rows) => {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
    });
  }).then((???) => {
    return new Promise((resolve, reject) => {

      const sql =
        `
        SELECT count(user_idx) AS likeCount
        FROM like
        GROUP BY user_idx
        WHERE user_idx=?;
        `;

      pool.query(sql, ???, (err, rows) => {
          if (err) {
            reject(err)
          } else{
            resolve(rows)
          }
      })
    })
    })
};*/




/******
 * wish 조회
 * @param wishData
 * @returns {Promise}
 */


 //종료된전시는 어덯게 없어짐
exports.wish = (wishData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT
          e.exhibition_name,
          e.exhibition_picture,
          date_format(convert_tz(exhibition_start_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_stard_date,
          date_format(convert_tz(exhibition_end_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_end_date,
          UNIX_TIMESTAMP() - UNIX_TIMESTAMP(exhibition_start_date) as start_date,
          UNIX_TIMESTAMP() - UNIX_TIMESTAMP(exhibition_end_date) as end_date,
          heart.heart_used
      FROM YOURARTS.heart
      NATURAL JOIN YOURARTS.exhibition AS e
      WHERE heart.user_idx=?
      ORDER BY  e.exhibition_end_date,
                e.exhibition_name;
      `;
        pool.query(sql, wishData, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        })
  });
};
