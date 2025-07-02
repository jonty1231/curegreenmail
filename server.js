import express from "express";

import cors from "cors";
import { sentMail } from "./nodmailsend.js";


const app= express();

app.use(express.json());
app.use(cors());






app.get("/",async(req,res)=>{
    return res.json({working:"yes working"})
})







app.post("/sendmail",async(req,res)=>{
   try {
  const { formdata, sendto, subject } = req.body;

  const keys = Object.keys(formdata);
  const values = Object.values(formdata);

  await sentMail({ keys, values, sendto, subject });

  return res.status(201).json({ success: true, message: "Mail sent successfully" });
} catch (error) {
  console.error("Error sending mail:", error);
  return res.status(500).json({ success: false, message: "Failed to send mail", error: error.message });
}

})








const PORT =  9000

app.listen(PORT,()=>{
    console.log(`APP running on PORT http://localhost:${PORT}`)
})
