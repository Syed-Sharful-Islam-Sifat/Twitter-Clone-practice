import NextAuth, { getServerSession } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { dbConnect } from "@/config/db";
import User from "@/models/users";

export const authOptions = {
    providers:[
        CredentialsProvider({
            async authorize(credentials,req){
                try{
                    dbConnect();
                    const{email,password} = credentials;

                    if(!email||!password)throw new Error('please fill all the required fields');

                    const user = await User.findOne({email});

                    if(!user){
                        throw new Error('User does not exist');
                    }

                    const isPasswordMatched = await bcrypt.compare(password,user.password);

                    if(!isPasswordMatched){
                        throw new Error('Invalid Credentials')
                    }

                    return user
                }catch(err){
                    throw new Error('Something went wrong')
                }
            }
        })
    ] ,

    callbacks:{
       
        async jwt({token,session,user}){
         //   console.log('jwt callback',{token,user,session});
            if(user){
                return{
                    ...token,
                    id:user._id,
                    isVerified: user.isVerified,
                    profileImage:user.profileImage,
                    coverPhoto: user.coverPhoto
                }
            }
            return token
        },
        async session({token,session}){
            
            return{
                ...session,
                 id:token.id,
                 isVerified: token.isVerified,
                 profileImage:token.profileImage,
                 coverPhoto:token.coverPhoto
            };
            return session;
        }
    },

    session:{
        strategy: "jwt"
    },
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)