const { createContext, useContext, useState } = require("react");


const ModalContext = createContext();

export  const useModal = ()=>{
    return useContext(ModalContext)
}

export const ModalProvider = ({children})=>{
    const [isModal,setIsModal] = useState(false);

    return(
        <ModalContext.Provider value={[isModal,setIsModal]}>
          {children}
        </ModalContext.Provider>
    )
}