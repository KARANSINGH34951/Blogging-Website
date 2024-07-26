const express= require("express")
const userModel= require("../models/user")

const router = express.Router()

router.get("/",(req,res)=>{ 
    res.render("home")
});

router.get("/signin", (req, res) => {
    res.render("signin")
    
})

router.get("/signup", (req, res) => {
  res.render("signup")
})

router.post("/signup",async (req, res) => {
  const {fullName,email,password} = req.body;

  await userModel.create({
    fullName,
    email,
    password
  });

  return res.redirect("/user/signin")
  
})


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userModel.matchPasswordAndGenerateToken(email, password);
    // res.status(200).json({ token });
    // console.log(token);
    return res.cookie("token",token).redirect("/")
    
  } catch (error) {
    return res.render("signin",{error:"Incorrect Email or password"})
  }
});

router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("/")
})

module.exports = router