import NavBar from "../components/NavBar";
import ShoppingCart from "../components/ShoppingCart";

function ShoppingCartPage() {
    
  return (
    
    <div className="d-flex flex-column h-100">
     <NavBar /> 
      <ShoppingCart />
    </div>
    
    
  );
}

export default ShoppingCartPage;