import express from "express";
import cors from "cors";
import {client} from "@repo/db/client"
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/user", async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({
      message: "Missing required field",
    });
  }

  try {
    const user = await client.user.create({
      data: { email, password, fullName },
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create user",
      error: err instanceof Error ? err.message : err,
    });
  }
});

app.get("/api/user", async (req, res) => {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const userData = await client.user.findFirst({
      where: { email },
    });

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User exists",
      user: userData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching user",
      error: err instanceof Error ? err.message : err,
    });
  }
});


app.listen(8080,()=>{
  console.log("Server is running on port 8080")
})