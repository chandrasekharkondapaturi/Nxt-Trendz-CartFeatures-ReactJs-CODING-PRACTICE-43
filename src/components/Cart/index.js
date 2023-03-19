import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const onClickRemoveAllItems = () => {
        removeAllCartItems()
      }

      const gettingTotalPrice = Item => {
        const {price, quantity} = Item
        return price * quantity
      }
      const eachItemPrice = () => {
        const ActualPrice = cartList.map(eachItem =>
          gettingTotalPrice(eachItem),
        )
        const TotalPrice = ActualPrice.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        )
        return TotalPrice
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <button
                  className="RemoveAll-button"
                  type="button"
                  onClick={onClickRemoveAllItems}
                >
                  Remove All
                </button>
                <h1 className="cart-heading">My Cart</h1>
                <CartListView />
                <div className="order-total-container">
                  <h1>
                    Order Total:{' '}
                    <span className="Total-price-badge">
                      Rs {eachItemPrice()}/-
                    </span>
                  </h1>
                  <p className="Items-para">{cartList.length} items in cart</p>
                  <button className="Checkout-button" type="button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
