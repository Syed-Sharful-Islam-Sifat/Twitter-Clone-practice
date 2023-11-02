import { decode, getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select

export default withAuth(
async  function middleware (req) {
    const {token} = req.nextauth;
   
    console.log(req.nextUrl.pathname); 
    
    if(!token){
        if(req.nextUrl.pathname!=='/') 
        return NextResponse.redirect(new URL('/', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return true
      }
    }
  }
)

export const config = {matcher:['/Home/:path*','/users/:path*','/messages']}