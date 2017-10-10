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
          exhibition_idx,
          exhibition_name,
          date_format(convert_tz(exhibition_start_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_stard_date,
          date_format(convert_tz(exhibition_end_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_end_date,
          UNIX_TIMESTAMP() - UNIX_TIMESTAMP(exhibition_start_date) as start_date,
          UNIX_TIMESTAMP() - UNIX_TIMESTAMP(exhibition_end_date) as end_date,
          exhibition_picture,
          ROUND((exhibition_sum / exhibition_count), 1) as avg
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




exports.exDetail = (data) => {
  let results = [];

  // 전시 상세 조회
  return new Promise((resolve, reject) => {
    const sql =
      `
        SELECT
          e.exhibition_idx,
          exhibition_name,
          date_format(convert_tz(exhibition_start_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_stard_date,
          date_format(convert_tz(exhibition_end_date, "+00:00", "+00:00"), "%Y.%m.%d") as exhibition_end_date,
          exhibition_start_time,
          exhibition_end_time,
          exhibition_location,
          exhibition_description,
          exhibition_picture,
          ROUND((exhibition_sum/exhibition_count), 1) as avg,
          l.like_count,
          h.heart_used
        FROM exhibition as e
          LEFT JOIN \`like\` as l ON e.exhibition_idx = l.exhibition_idx
          LEFT JOIN heart as h ON e.exhibition_idx = h.exhibition_idx
        WHERE e.exhibition_idx = ?

      `;
    pool.query(sql, [data.idx], (err, rows) => {
      if(err) {
        reject(err);
      } else {
        results.push(rows);
        resolve(rows);
      }
    });
  }).then(() => {
    // 전시 미리보기 이미지 조회
    return new Promise((resolve, reject) => {
      const sql =
        `
        SELECT
          work_idx,
          work_image
        FROM work as w
        WHERE w.exhibition_idx = ?
        `;

      pool.query(sql, [data.idx], (err, rows) => {
        if(err){
          reject(err)
        }else {
          results.push(rows);
          resolve(results);
        }
      });
    })
  });
};

exports.workDetail = (data) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
        SELECT
          w.work_idx,
          w.work_name,
          w.work_size,
          w.work_idx,
          w.work_style,
          w.work_owner,
          w.work_image
        FROM work AS w
          LEFT JOIN exhibition AS e ON w.exhibition_idx = e.exhibition_idx

        WHERE w.exhibition_idx = ?
      `;
    pool.query(sql, [data.idx], (err, rows) => {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }

    });
  });
};

