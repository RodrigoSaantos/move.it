import { createContext, ReactNode, useState } from "react"

interface SideBarContextData {
  buttonHome: boolean;
  buttonAward: boolean;
  handleButtonHome: () => void;
  handleButtonAward: () => void;
}

interface SideBarProviderProps {
  children: ReactNode;
}

export const SideBarContext = createContext({} as SideBarContextData);

export function SideBarProvider({ children }: SideBarProviderProps) {

  const [buttonHome, setButtonHome] = useState(true);
  const [buttonAward, setButtonAward] = useState(false);

  function handleButtonHome() {
    setButtonHome(true);
    setButtonAward(false);
  }

  function handleButtonAward() {
    setButtonHome(false);
    setButtonAward(true);
  }

  return (
    <SideBarContext.Provider
      value={{ 
        buttonHome, 
        buttonAward, 
        handleButtonHome, 
        handleButtonAward
      }} 
    >
      {children}
    </SideBarContext.Provider>
  )
} 