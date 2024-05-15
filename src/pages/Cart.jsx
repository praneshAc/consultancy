import InnerHeaderBanner from "../components/InnerHeaderBanner";
import CartList from "../components/cart/CartList";
function Cart(){
    return(
        <>
        <InnerHeaderBanner name={"Cart"}/>
        <CartList />
        </>
    );

}
export default Cart;