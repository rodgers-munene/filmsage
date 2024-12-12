"use client"
import { createContext, useContext, useState, ReactNode } from "react"

// define the context type
type TrailerDivContextType = {
    visibility: boolean;
    toggleVisibility: () => void;
}

// create the context
const TrailerDivContext = createContext<TrailerDivContextType | undefined>(undefined);

// custom hook to use SidebarContext

export const useTrailer: any = () => {
    const context = useContext(TrailerDivContext);
    if(!context) {
        throw new Error("useTrailer must be used within a TrailerProvider");
    }

    return context;
}

// provider component to wrap around the app

export const TrailerProvider = ( { children } : { children: ReactNode}) => {
    const [visibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility((prev) => !prev);
    }
    
    
    
    return (
        <TrailerDivContext.Provider value={{visibility, toggleVisibility}}>
            {children}
        </TrailerDivContext.Provider>
    )
}