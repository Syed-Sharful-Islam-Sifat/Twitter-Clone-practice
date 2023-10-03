import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/config/db";
import Post from "@/models/posts";
export default async function handler(req,res){

 
    try{
        if(req.method==='POST'){
    
                const session = await getServerSession(req,res,authOptions);
                console.log('session',session);
            
                const {id} = session;
            
                const {contentType,text} = req.body;
            
                console.log(req.body)
            
                 const post = await Post.create({
                     userId:id,
                     contentType,
                     text
                 })
            
                res.status(200).json({message:'Post created successfully'})
            
    
    
    }
    
        if(req.method==='GET'){
            console.log(req.method)
            dbConnect();
            const posts = await Post.find();
           
            res.status(200).json(posts)
            

        }

    }catch(error){
        res.status(400).end();
    }

}