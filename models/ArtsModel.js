'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);
const date = new Date();


/******
 * 전시 검색
 * @param searchData
 * @returns {Promise}
 */
exports.search = (searchData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
        SELECT
          exhibition_idx,
          exhibition_name,
          exhibition_start_date,
          exhibition_end_date,
          exhibition_picture          
        FROM exhibition
        WHERE exhibition_name REGEXP ?;
      `;

    pool.query(sql, searchData, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }

    })
  });
};


/*****
 * 전시 조회
 * @param data
 * @returns {Promise}
 */
exports.list = (data) => {
  return new Promise((resovle, reject) => {
      const sql =
        `
        SELECT
          exhibition_name,
          date_format(convert_tz(exhibition_start_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_stard_date,
          date_format(convert_tz(exhibition_end_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_end_date,
          UNIX_TIMESTAMP() - UNIX_TIMESTAMP(exhibition_start_date) as start_date,
          UNIX_TIMESTAMP() - UNIX_TIMESTAMP(exhibition_end_date) as end_date,
          exhibition_picture,
          (exhibition_sum / exhibition_count) as avg
        FROM exhibition
        `;

      pool.query(sql, data, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resovle(rows);
        }
      });
  });
};

