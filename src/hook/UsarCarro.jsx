import { useContext } from "react";
import { CartContext } from "../contexto/CarroContexto";

export function useCart() {
  return useContext(CartContext);
}
