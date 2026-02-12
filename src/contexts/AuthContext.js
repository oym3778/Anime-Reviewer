import { createContext } from "react";

export const AuthContext = createContext(null);

// NOTE
/*
    Fast refresh only works when a file only exports components occurs 
    because React Fast Refresh requires files to export only React components 
    to reliably preserve component state during hot updates. When you mix 
    component and non-component exports (like createContext, constants, or 
    utility functions) in the same file, Fast Refresh cannot determine which 
    parts to update efficiently and falls back to a full page reload or shows this warning. 
*/
