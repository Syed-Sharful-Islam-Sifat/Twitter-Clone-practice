import NextAuth, { getServerSession } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { dbConnect } from "@/config/db";
import User from "@/models/users";
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    providers:[

        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
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

                    if(!user.isVerified){
                        throw new Error('Please verify your email first')
                    }

                    return user
                }catch(err){
                    throw new Error(err)
                }
            }
        })
    ] ,

    callbacks:{

        async signIn({ user, account}) {


            const {name,email} = user
    
            try {
               await dbConnect()
                const userExists = await User.findOne({ email: email });
                console.log('userExists', userExists);
              
                if (account.type === 'oauth') {
                  if (!userExists) {
                    // User doesn't exist in your database, you can choose to create the user here
                    // Example: const newUser = await User.create({ name, email, ...otherFields });
                
                    const newUser = await User.create({
                        name,
                        email,
                        isVerified:true
                    })

                    
                    await newUser.save();
                    user = newUser
                    console.log(newUser);
                    console.log(user,newUser)
                    return true;
                   
                  }
                }
              } catch (error) {
                console.error('Error while checking user existence:', error);
              }
            return true;
          },
       

        async jwt({token,session,user}){

            try{

                if(user){
                    return{
                        ...token,
                        id:user?._id,
                        isVerified: user?.isVerified,
                        profileImage:user?.profileImage,
                        coverPhoto: user?.coverPhoto
                    }
                }
            }catch(error){
                console.log('error on jwt',error)
            }
           
            return token
        },
        async session({token,session}){
            console.log('session on callback',token,session) 
            return{
                ...session,
                id:token.id,
                isVerified: token.isVerified,
                profileImage:token.profileImage,
                coverPhoto:token.coverPhoto
            };
            return session;
        },
    },

    session:{
        strategy: "jwt"
    },
    
    secret: process.env.NEXTAUTH_SECRET,
    // jwt:{
    //     secret: process.env.NEXTAUTH_JWT_SECRET
    // },
}

export default NextAuth(authOptions)