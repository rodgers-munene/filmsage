'use client'
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
type SidebarContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

// Create the context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Custom hook to use the SidebarContext
export const useSidebar: any = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Provider component to wrap around the app
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
