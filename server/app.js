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
    let databaseItems = await client.query("SELECT * FROM pratice");
    client.release();
    res.json(databaseItems.rows);
    // await client.end();
});
  //---------index of event by ID ---------
app.get("/data/:id", async (req, res) => {
    const client = await pool.connect();
    var databaseItems = await client.query("SELECT * FROM pratice WHERE id=$1", [
      req.params.id
    ]);
    client.release();
    res.json(databaseItems.rows[0]); //event is data inputed by user in the url bar
});
  //---------add one new event to events---------
app.post("/data", async (req, res) => {
    const client = await pool.connect();
    await client.query(
      "INSERT INTO pratice(name,date) VALUES($1, $2) RETURNING *",
      [req.body.name,req.body.date]
    );
    let databaseItems = await client.query("SELECT * FROM pratice");
    client.release();
    res.json(databaseItems.rows);
});
  //---------edit one event from events---------
app.put("/data/:id", async (req, res) => {
    const client = await pool.connect();
    // var oldData = client.query(function (dataFunc) {
    //   return req.params.id == dataFunc.id;
    // });
    let name = req.body.name;
    let date = req.body.date;
    // res.json(olDdata);

    var found = await client.query(
      "UPDATE pratice SET name = ($1),date = ($2) WHERE id = ($3)",
      [name, date, req.params.id]
    );
    
    client.release();
    res.json(found.rows[0])
});
  //---------delete one event from events---------
app.delete("/data/:id", async (req, res) => {
    const client = await pool.connect();
    var dataToDelete = client.query(function (dataFunc) {
      return req.params.id == dataFunc.id;
    });
    res.json(dataToDelete);
    
    await client.query("DELETE FROM pratice WHERE id = $1", [
      req.params.id
    ]);
    client.release();
    
    
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))