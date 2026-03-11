import e from "express";
import { connection, CollectionName } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = e();
app.use(e.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());

   app.post("/login", async (req, resp) => {
  const userData = req.body;

  if (userData.email && userData.password) {

    const db = await connection();
    const collection = db.collection("users");

    const user = await collection.findOne({
      email: userData.email,
      password: userData.password
    });

    if (user) {

      jwt.sign(userData, "Google", { expiresIn: "5d" }, (err, token) => {

        if (err) {
          resp.send({
            success: false,
            message: "Token error"
          });
        } else {
          resp.send({
            success: true,
            message: "Login successful",
            token: token
          });
        }

      });

    } else {
      resp.send({
        success: false,
        message: "Invalid email or password"
      });
    }

  } else {
    resp.send({
      success: false,
      message: "Email and password required"
    });
  }
});


app.post("/SignUp", async (req, resp) => {

  const userData = req.body;

  if(userData.email && userData.password){

    const db = await connection();
    const collection = db.collection("users");

    const result = await collection.insertOne(userData);

    if(result.acknowledged){

      jwt.sign(userData,"Google",{expiresIn:"5d"},(err,token)=>{

        if(err){
          resp.send({
            success:false,
            message:"Token error"
          });

        } else {

          resp.send({
            success:true,
            message:"Signup successful",
            token:token
          });

        }

      });

    } else {

      resp.send({
        success:false,
        message:"Signup failed"
      });

    }

  } else {

    resp.send({
      success:false,
      message:"Email and password required"
    });

  }

});

app.post("/add-task",verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const collection = await db.collection(CollectionName);

  const result = await collection.insertOne(req.body);

  if (result.acknowledged) {
    resp.send({
      message: "Task added successfully",
      success: true
    });
  } else {
    resp.send({
      message: "Failed to add task",
      success: false
    });
  }
});

   app.get("/tasks",verifyJWTToken, async (req, resp) => {
   const db = await connection();
   const collection = await db.collection(CollectionName);

   const data = await collection.find().toArray();

  if (data) {
    resp.send({
      message: "Tasks retrieved successfully",
      success: true,
      data: data
    });
  } else {
    resp.send({
      message: "Failed to retrieve tasks",
      success: false
    });
  }
   });

   app.get("/task/:id",verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const collection = await db.collection(CollectionName);

  const id = req.params.id;

  const data = await collection.findOne({ _id: new ObjectId(id) });

  if (data) {
    resp.send({
      message: "Task retrieved successfully",
      success: true,
      data: data
    });
  } else {
    resp.send({
      message: "Failed to retrieve task",
      success: false
    });
  }
});

  app.put("/update-task/:id",verifyJWTToken, async (req, resp) => {

  const db = await connection();
  const collection = db.collection(CollectionName);

  const id = req.params.id;

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: req.body.title,
        description: req.body.description
      }
    }
  );

  if (result.modifiedCount > 0) {
    resp.send({
      message: "Task updated successfully",
      success: true
    });
  } else {
    resp.send({
      message: "Task not updated",
      success: false
    });
  }

});
  
app.delete("/delete-task/:id",verifyJWTToken, async (req, resp) => {

  const db = await connection();
  const collection = await db.collection(CollectionName);

  const result = await collection.deleteOne({
    _id: new ObjectId(req.params.id)
  });
  
  if (result.deletedCount > 0) {
    resp.send({
      message: "Task deleted successfully",
      success: true
    });
  } else {
    resp.send({
      message: "Task not found",
      success: false
    });
  }

});

     app.delete("/delete-task-multiple",verifyJWTToken, async (req, resp) => {

  const db = await connection();
  const collection = db.collection(CollectionName);

  const ids = req.body;

  const objectIds = ids.map((id) => new ObjectId(id));

  const result = await collection.deleteMany({
    _id: { $in: objectIds }
  });

  resp.send({
    success: true,
    deletedCount: result.deletedCount
  });

});
 
  function verifyJWTToken(req, res, next) {
  console.log("Verifying token...",req.cookies['token']);
  
  const token = req.cookies['token'];
  jwt.verify(token, "Google", (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(401).send({
        success: false,
        message: "Invalid token"
      });
    } else {
      req.user = decoded;
      next();
    }
  });
  // const token = req.cookies['token'];  
 }



app.listen(3200, () => {
  console.log("Server is running on port 3200");
});