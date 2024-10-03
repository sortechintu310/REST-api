import express from "express";
import pg from "pg";
import env from "dotenv";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5000;
const saltRouonds = 10;

env.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

async function randomProduct() {
  try{
    const response = await db.query("SELECT id,image,INITCAP(category) category,INITCAP(sub_category) sub_category,INITCAP(name) name,price FROM products");
    let randomNo = Math.floor(Math.random() * response.rows.length);
    const response2 = await db.query("SELECT id,image,INITCAP(category) category,INITCAP(sub_category) sub_category,INITCAP(name) name,price FROM products WHERE id = $1", [randomNo]);
    return response2.rows;
  }catch(e){
    res.json(e.message)
  }
}

app.get("/api/products/all", async (req, res) => {
  try {
    const response = await db.query("SELECT id,image,INITCAP(category) category,INITCAP(sub_category) sub_category,INITCAP(name) name,price FROM products")
    res.json(response.rows);
  } catch (e) {
    res.json(e.message)
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const response = await db.query("SELECT id,image,INITCAP(category) category,INITCAP(sub_category) sub_category,INITCAP(name) name,price FROM products WHERE id=$1", [req.params.id]);
    res.json(response.rows);
  } catch (e) {
    res.json(e.message)
  }
});

app.get("/api/random", async (req, res) => {
  try {
    const response = await randomProduct();
    res.json(response);
  } catch (e) {
    res.json(e.message)
  }
});

app.get("/api/random/:n", async (req, res) => {
  const n = req.params.n;
  try {
    const response = await db.query("SELECT id,image,INITCAP(category) category,INITCAP(sub_category) sub_category,INITCAP(name) name,price FROM products ORDER BY RANDOM() LIMIT $1",[n]);
    res.json(response.rows);
  } catch (e) {
    res.json(e.message)
  }
});

//filter by category or sub-category or price or name
app.get("/api/filter", async (req, res) => {
  try {
    if (req.query.category) {
      const response = await db.query("SELECT *FROM products WHERE category=$1", [req.query.category]);
      res.json(response.rows);
    } else if (req.query.name) {
      const response = await db.query("SELECT *FROM products WHERE name=$1", [req.query.name]);
      res.json(response.rows);
    } else if (req.query.sub_category) {
      const response = await db.query("SELECT *FROM products WHERE sub_category=$1", [req.query.sub_category]);
      res.json(response.rows);
    } else if (req.query.price) {
      const response = await db.query("SELECT *FROM products WHERE price BETWEEN $1 AND $2", [req.query.price - 50, req.query.price]);
      res.json(response.rows);
    }
  } catch (e) {
    res.json(e.message)
  }
});

//get user data
app.get("/api/users",async(req,res)=>{
  try{
    const response = await db.query("SELECT *FROM users");
    res.json(response.rows)
  }catch(e){
    res.json(e.message);
  }
});

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const ress = await db.query("SELECT *FROM users");
  console.log(ress.rows);
  try {
    const response = await db.query("SELECT *FROM users WHERE email=$1", [email]);
    if (response.rows.length > 0) {
      const user = response.rows[0];
      const storedPassword = user.password;
      bcrypt.compare(pass, storedPassword, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result) {
            res.send("logged in successfully...");
          } else {
            res.send("Incorrect Password");
          }
        }
      });
    } else {
      res.send("User not found login failed try again <a href='/login'>login</a> again")
    }
  } catch (e) {
    res.json(e.message)
  }
});

app.post("/api/signup", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  try {
    const response = await db.query("SELECT *FROM users WHERE email=$1", [email]);
    if (response.rows.length > 0) {
      res.send("Email already exists try loggin in again.")
    } else {
      bcrypt.hash(pass, saltRouonds, async (err, hash) => {
        if (err) {
          console.log("Error hashing password", (err));
        } else {
          await db.query("INSERT INTO users(email,password) VALUES($1,$2)", [email, hash]);
          res.send("registered successfully");
        }
      })
    }
  } catch (e) {
    res.json(e.message)
  }
});

app.post("/api/addcart", async (req, res) => {
  const userId = req.body.userid;
  const productId = req.body.productid;
  try {
    const response = await db.query("INSERT INTO cart(user_id,item_id) VALUES($1,$2) RETURNING *", [userId, productId]);
    if (response.rows.length > 0) {
      const response = await db.query("SELECT name,sub_category,email FROM products, users WHERE products.id=$1 AND users.id = $2", [productId, userId])
      const result = response.rows;
      res.json({message:`${result[0].email} added ${result[0].name} ${result[0].sub_category} to cart successfully.....`});
    } else {
      res.send("Error occurred while trying to add item to cart")
    }
  } catch (e) {
    res.json(e.message)
  }
});

app.post("/api/showcart", async (req, res) => {
  const userId = req.body.userid;
  try{
    const response = await db.query("SELECT products.id,name,category,price FROM cart JOIN products ON item_id = products.id WHERE user_id = $1",[userId])
    console.log(response.rows)
    res.json(response.rows)
  }catch(e){
    res.json(e.message)
  }
});


//admin
app.get("/api/admin",(req,res)=>{
  res.render("admin.ejs");
})

app.post("/api/admin/addproduct",async(req,res)=>{
  const image = req.body.image;
  const category = req.body.category;
  const sub_category = req.body.sub_category;
  const name = req.body.name;
  const price = req.body.price;
  console.log({image,category,sub_category,name,price})
  try{
    const response = await db.query("INSERT INTO products(image,category,sub_category,name,price) VALUES($1,$2,$3,$4,$5) RETURNING*",[image,category,sub_category,name,price]);
    console.log(response.rows)
    res.json(response.rows);
  }catch(e){
    res.json(e.message)
  }
})


app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});                                       