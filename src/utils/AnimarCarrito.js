export default function animarAlCarrito(imagen){

const cart = document.querySelector(".floating-cart")

if(!cart || !imagen) return

const imgClone = imagen.cloneNode(true)

const rect = imagen.getBoundingClientRect()
const cartRect = cart.getBoundingClientRect()

imgClone.style.position = "fixed"
imgClone.style.top = rect.top + "px"
imgClone.style.left = rect.left + "px"
imgClone.style.width = rect.width + "px"
imgClone.style.height = rect.height + "px"
imgClone.style.transition = "all 0.8s ease"
imgClone.style.zIndex = "9999"
imgClone.style.pointerEvents = "none"

document.body.appendChild(imgClone)

setTimeout(()=>{

imgClone.style.top = cartRect.top + "px"
imgClone.style.left = cartRect.left + "px"
imgClone.style.width = "20px"
imgClone.style.height = "20px"
imgClone.style.opacity = "0.5"

},50)

setTimeout(()=>{

imgClone.remove()

cart.classList.add("cart-bounce")

setTimeout(()=>{
cart.classList.remove("cart-bounce")
},300)

},800)

}