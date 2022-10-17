require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/v1/users", async (req, res) => {
  try {
    const result = await db.query("select * from restaurants");
    console.log(result);
    res.status(200).json({
      status: "Sucess",
      results: result.rows.length,
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/users/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const result = await db.query(`select * from restaurants where id = $1`, [
      req.params.id,
    ]);
    console.log(result.rows[0]);
    res.status(200).json({
      status: "Success",
      results: result.rows.length,
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (e) {}
});

app.post("/api/v1/users", async (req, res) => {
  try {
    console.log(req.body);
    const result = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(200).json({
      status: "Sucess",
      data: {
        restaurant: result.rows[0],
      },
    });
    console.log(result);
  } catch (e) {}
});

app.put("/api/v1/users/:id", async (req, res) => {
  try {
    console.log(req.body);
    const result = await db.query(
      `UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *`,
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(result);
    res.status(200).json({
      status: "Sucess",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (e) {}
});

app.delete("/api/v1/users/:id", async (req, res) => {
  try {
    console.log(req.body);
    const result = await db.query(
      `UPDATE restaurants SET name = '$1', location = '$2', price_range = '$3' returning *`,
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(200).json({
      status: "Sucess",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (e) {}
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
