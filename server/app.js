const express = require('express')
const app = express()
const port = 3003
const path = require('path');
app.use(express.json()); //allows us to use the json libraries in express(using bodies for POST and PUT)data
//----------------------------------
//this is the connection to my database
const Pool  = require("pg").Pool; //pool allows local device to connect to your server asynchronously
const pool = new Pool({
    // user:'me',
    host:'localhost',
    database:'assessment_practice',
    port:5432
});




app.get("/data", async (req, res) => {
    const client = await pool.connect();
    let databaseItems = await client.query("SELECT * FROM apprentice");
    client.release();
    res.json(databaseItems.rows);
    // await client.end();
});
app.get("/cohort", async (req, res) => {
    const client = await pool.connect();
    let databaseItems = await client.query("SELECT * FROM cohort");
    client.release();
    res.json(databaseItems.rows);
    // await client.end();
});
  //---------index  ---------
app.get("/data/:id", async (req, res) => {
    const client = await pool.connect();
    var databaseItems = await client.query("SELECT * FROM apprentice WHERE id=$1", [
      req.params.id
    ]);
    client.release();
    res.json(databaseItems.rows[0]); //event is data inputed by user in the url bar
});
  //---------add one ---------
app.post("/data", async (req, res) => {
    const client = await pool.connect();
    await client.query(
      "INSERT INTO apprentice(first_name,last_name) VALUES($1, $2) RETURNING *",
      [req.body.first_name,req.body.last_name]
    
    );
    console.log('query params',req.body.forst_name,req.body.last_name);
    console.log('query body',req.body)
    let databaseItems = await client.query("SELECT * FROM apprentice");
    client.release();
    res.json(databaseItems.rows);
});
  //---------edit one ---------
app.put("/data/:id", async (req, res) => {
    const client = await pool.connect();
    // var oldData = client.query(function (dataFunc) {
    //   return req.params.id == dataFunc.id;
    // });
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    // res.json(olDdata);
    console.log('the server side',req.body)

    var found = await client.query(
      "UPDATE apprentice SET first_name = $1, last_name = $2 WHERE id = $3 returning *",
      [first_name,last_name, req.params.id]
    );
    
    client.release();
    res.json(found.rows[0])
});
app.get("/data/:first_name", async (req, res) => {
    const client = await pool.connect();
    var databaseItems = await client.query("SELECT * FROM apprentice WHERE first_name=$1", [
      req.params.first_name
    ]);
    client.release();
    res.json(databaseItems.rows[0]); //event is data inputed by user in the url bar
});
  //---------delete one ---------
app.delete("/data/:id", async (req, res) => {
    const client = await pool.connect();
    var dataToDelete = client.query(function (dataFunc) {
      return req.params.id == dataFunc.id;
    });
    res.json(dataToDelete);
    
    await client.query("DELETE FROM apprentice WHERE id = $1", [
      req.params.id
    ]);
    client.release();
    
    
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))