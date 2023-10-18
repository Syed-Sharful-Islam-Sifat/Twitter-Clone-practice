import User from "@/models/users";
export default async function handler(req,res){
    if(req.method!=='GET')return res.status(405).end();

    try{
         const users = await User.find();

         return res.status(200).json(users)
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}