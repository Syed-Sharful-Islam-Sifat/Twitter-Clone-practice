import { useRouter } from "next/router";
import { useCallback } from "react";

import React from 'react'

const Header = ({label}) => {

    const router = useRouter();
    
    const handleback = useCallback(()=>{
      router.back();
    })
    return (
        <div className="header-container">
         <div className="header">
            <h1 className="header-text">{label}</h1>
         </div>
        </div>
        )
    }
export default Header
