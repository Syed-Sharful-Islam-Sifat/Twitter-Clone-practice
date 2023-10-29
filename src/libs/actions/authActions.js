import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth";

export async function isAuthenticated(request,response){

     const session = await getServerSession(request,response,authOptions);

     if(session.isVerified)return true

    return false;

}