import { useContext } from "react";
import { ProductContext } from "@contexts/ProductContext";

export function useProduct(){
  const contextData = useContext(ProductContext)

  return contextData
}