{/*export async function obtenerProductos(){

  const response = await fetch("https://script.google.com/macros/s/AKfycbwkqEgcovCtOsP3QJTGZT02QTjafUo2qqm88nHx3UNYDCtVjE8KoOQATdC7g9R0sSE-BA/exec");

  const data = await response.json();

  return data;

}*/}


import HoodieRickMorty1 from "../imagenes/HoodieRickMorty1.jpeg"
import HoodieRickMorty2 from "../imagenes/HoodieRickMorty2.jpeg"
import HoodieRickMorty3 from "../imagenes/HoodieRickMorty3.jpeg"
import ChaquetaJean1 from "../imagenes/ChaquetaJean1.jpeg"
import ChaquetaJean2 from "../imagenes/ChaquetaJean2.jpeg"
import ChaquetaJean3 from "../imagenes/ChaquetaJean3.jpeg"
import ChaquetaJean4 from "../imagenes/ChaquetaJean4.jpeg"
import VestidoLila1 from "../imagenes/VestidoLila1.jpeg"
import VestidoLila2 from "../imagenes/VestidoLila2.jpeg"
import VestidoRosaMelon1 from "../imagenes/VestidoRosaMelon1.jpeg"
import VestidoRosaMelon2 from "../imagenes/VestidoRosaMelon2.jpeg"
import VestidoRosaMelon3 from "../imagenes/VestidoRosaMelon3.jpeg"
import VestidoNegroRosas1 from "../imagenes/VestidoNegroRosas1.jpeg"
import VestidoNegroRosas2 from "../imagenes/VestidoNegroRosas2.jpeg"
import VestidoNegroRosas3 from "../imagenes/VestidoNegroRosas3.jpeg"
import CamisetaVolcom1 from "../imagenes/CamisetaVolcom1.jpeg"
import CamisetaVolcom2 from "../imagenes/CamisetaVolcom2.jpeg"
import CamisaTommy1 from "../imagenes/CamisaTommy1.jpeg"
import CamisaTommy2 from "../imagenes/CamisaTommy2.jpeg"
import CamisaTommy3 from "../imagenes/CamisaTommy3.jpeg"
import CamisaBillabong1 from "../imagenes/CamisaBillabong1.jpeg"
import CamisaBillabong2 from "../imagenes/CamisaBillabong2.jpeg"
import CamisaBillabong3 from "../imagenes/CamisaBillabong3.jpeg"
import BuzoRayado1 from "../imagenes/BuzoRayado1.jpeg"
import BuzoRayado2 from "../imagenes/BuzoRayado2.jpeg"
import BuzoRayado3 from "../imagenes/BuzoRayado3.jpeg"
import BlusaAzul1 from "../imagenes/BlusaAzul1.jpeg"

const productos = [
  {
    id: 1,
    nombre: "Hoodie Rick & Morty",
    precio: 15,
    talla: "S",
    marca: "KOAK",
    imagen: [HoodieRickMorty1, HoodieRickMorty2, HoodieRickMorty3]
  },
  {
    id: 2,
    nombre: "Chaqueta jean",
    precio: 15,
    talla: "S",
    marca: "mavi",
    imagen: [ChaquetaJean1, ChaquetaJean2, ChaquetaJean3, ChaquetaJean4]
  },
  {
    id: 3,
    nombre: "Vestido lila detalle floreado",
    precio: 20,
    talla: "S",
    marca: "",
    imagen: [VestidoLila1, VestidoLila2]
  },
  {
    id: 4,
    nombre: "Vestido rosa melon floreado",
    precio: 3,
    talla: "S",
    marca: "Bershka",
    imagen: [ VestidoRosaMelon1, VestidoRosaMelon2, VestidoRosaMelon3]
  },
  {
    id: 5,
    nombre: "Vestido negro con rosas",
    precio: 10,
    talla: "L",
    marca: "Bershka",
    imagen: [VestidoNegroRosas1, VestidoNegroRosas2, VestidoNegroRosas3]
  },
  {
    id: 6,
    nombre: "Blusa azul",
    precio: 5,
    talla: "M",
    marca: "",
    imagen: [BlusaAzul1]
  },
  {
    id: 7,
    nombre: "Camisa Tommy Hilfiger",
    precio: 7,
    talla: "XL",
    marca: "Tommy Hilfiger",
    imagen: [CamisaTommy1, CamisaTommy2, CamisaTommy3]
  }
  ,
  {
    id: 8,
    nombre: "Camisa Billabong",
    precio: 5,
    talla: "S",
    marca: "Billabong",
    imagen: [CamisaBillabong1, CamisaBillabong2, CamisaBillabong3]
  }
  ,
  {
    id: 9,
    nombre: "Camisón Rayado",
    precio: 5,
    talla: "M",
    marca: "",
    imagen: [BuzoRayado1, BuzoRayado2, BuzoRayado3]
  }
  ,
  {
    id: 10,
    nombre: "Camiseta Volcom",
    precio: 5,
    talla: "M",
    marca: "Volcom",
    imagen: [CamisetaVolcom1, CamisetaVolcom2]
  }
];

export default productos;