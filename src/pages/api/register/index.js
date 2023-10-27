import User from "@/models/users";
import bcrypt from "bcrypt"
import { dbConnect } from "@/config/db";
import { sendEmail } from "@/libs/services/mailService";

export default async function handler(req, res) {
  
    if(req.method==='POST'){

        try{
            const data = await req.body;
            
            const {name,email,password} = data;
            dbConnect();
    
            if(!name||!email||!password){
              return res.status(400).json({message:'Please fill all the required fields'})
            }
    
            const userExists = await User.findOne({email});
    
            console.log(userExists);
    
            if(userExists){
                return res.status(400).json({message:'Use a different email , User already exists'})
            }
    
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt);
    
            const user = await User.create({
                name,
                email,
                password: hash
            })
    
    
            await sendEmail(
              "Twitter Verification Email",
              email,
              "Please Verify your Email through the link provided"
            )
            return res.status(201).json({message:'Please check your email to verify'})
    
        }catch(err){
          return res.status(500).json({error:err.message})
        }
     }
  
  }