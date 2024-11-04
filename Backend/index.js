const express = require("express");
const app = express();
const cors = require("cors");
const mysql2 = require("mysql2");

app.use(cors());
app.use(express.json());

const connection = mysql2.createConnection({
    host: "localhost",
    user: "surya",
    password: "995969",
    database: "cruds"
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err.message);
    } else {
        console.log("Connected to database successfully");
    }
});

app.get("/allusers", (req, res) => {
    const query = "SELECT * FROM fruits";
    connection.query(query, (err, result) => {
        if (err) {
            console.log("Error fetching data");
            res.send("Error fetching data");
        } else {
            res.json(result);
        }
    });
});

app.post("/adduser", (req, res) => {
    const { name, color } = req.body;
    const query = "INSERT INTO fruits (name, color) VALUES (?, ?)";
    connection.query(query, [name, color], (err) => {
        if (err) {
            console.log("Error adding data");
            res.send("Error adding data");
        } else {
            res.send("Data added successfully");
        }
    });
});

app.put("/updateuser/:id", (req, res) => {
    const { id } = req.params;
    const { name, color } = req.body;
    const query = "UPDATE fruits SET name = ?, color = ? WHERE id = ?";
    connection.query(query, [name, color, id], (err) => {
        if (err) {
            console.log("Error updating data");
            res.send("Error updating data");
        } else {
            res.send("Data updated successfully");
        }
    });
});

app.delete("/deleteuser/:id",(req,res)=>{
    let {id} = req.params;
    let query ="DELETE FROM FRUITS WHERE ID =?";
    connection.query(query,[id],(err,result)=>{
        if(err){
            console.log("error in deleting data");
            res.send("error in deleting data")  
        }else{
            console.log("data deleted successfully");
            res.send("data deleted successfully")  
        }
    })
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
















