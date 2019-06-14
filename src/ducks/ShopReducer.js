const initialState = {
  stock: [],
  cart: []
};

const SET_STOCK = "SET_STOCK";
const SET_CART = "SET_CART";

export default function ShopReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STOCK:
      return { ...state, stock: action.payload };
    case SET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}

export function setStock(item) {
  return {
    type: SET_STOCK,
    payload: item
  };
}

export function setCart(item) {
  return {
    type: SET_CART,
    payload: item
  };
}
