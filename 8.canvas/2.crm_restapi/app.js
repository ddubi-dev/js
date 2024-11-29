const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const port = 3000;

const db = new sqlite3.Database("user_sample.db");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "revenue.html"));
});

app.get("/gender_dist_data", (req, res) => {
  // 연령대별 남/여 10~60대 이상
  // 1. 연령대를 추출하기 위한 쿼리문
  // 2. 성별을 추출하기 위한 쿼리문
  // 3. 이 두 개를 합치면?
  // 4. 요청 후

  // 1. age BETWEEN 10 AND 19
  // const selectQuery = ``;

  // 2. AGE / 10 * 10
  const selectQuery = `
  SELECT (CAST(AGE AS INTEGER) / 10) * 10 AS AgeGroup, Gender, COUNT(*) AS UserCount
  FROM users
  GROUP BY AgeGroup, Gender
  `;

  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error("쿼리 실패");
    } else {
      console.log(rows);
      const labels = [];
      const count = [];

      for (const row of rows) {
        labels.push(row.AgeGroup + "대 " + row.Gender);
        count.push(row.UserCount);
      }

      const chartData = {
        labels: labels,
        count: count,
      };

      console.log(chartData);
    }
  });
});

app.get("/revenue_data", (req, res) => {
  const selectQuery = `SELECT 
            strftime('%Y-%m', orders.OrderAt) AS YearMonth,
            SUM(items.UnitPrice) AS MonthlyRevenue, 
            COUNT(order_items.ItemId) AS ItemCount
        FROM 
            orders
        JOIN 
            order_items ON orders.Id = order_items.OrderId
        JOIN 
            items ON order_items.ItemId = items.Id
        WHERE 
            orders.OrderAt >= '2023-01-01' AND orders.OrderAt <= '2023-12-31'
        GROUP BY 
            strftime('%Y-%m', orders.OrderAt)
        ORDER BY 
            strftime('%Y-%m', orders.OrderAt)`;

  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error("쿼리 실패");
    } else {
      // console.log(rows);

      const labels = [];
      const revenues = [];

      // 프론트가 원하는 데이터 형태로 가공해서 주면 좋다
      for (const row of rows) {
        labels.push(row.YearMonth);
        revenues.push(row.MonthlyRevenue);
      }

      const chartData = {
        labels: labels,
        revenues: revenues,
      };

      // console.log(chartData);

      res.json(chartData);

      // 값 없으면 실패 찍어줘야함
    }
  });
});

app.listen(port, () => {
  console.log("서버 레디");
});