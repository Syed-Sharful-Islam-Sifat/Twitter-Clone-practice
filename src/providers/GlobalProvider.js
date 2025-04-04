import { useContext , useState , createContext } from "react";


const GlobalContext = createContext();

export  const useGlobal = ()=>{
    return useContext(GlobalContext)
}

export const GlobalProvider = ({children})=>{
    const [isLoading,setIsLoading] = useState(false);

    return( 
        <GlobalContext.Provider value={[isLoading,setIsLoading]}>
          {children}
        </GlobalContext.Provider>
    )
}