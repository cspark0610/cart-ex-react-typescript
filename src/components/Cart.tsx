import { Component, MouseEvent } from "react";
import CartCSS from "./Cart.module.css";
import { FiShoppingCart } from "react-icons/fi";
import { AppStateContext, Item } from "../state/AppState";
import { v4 } from "uuid";

interface Props {}

interface State {
	isOpen: boolean;
}

class Cart extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	// define handleClick as arrow function to avoid binding this
	// IN ARROW FUNTION THIS KEYWORD IS BOUND TO THE CONTEXT WHERE THE FUNCTION IS CREATED (in this case the class constructor)
	handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		// console.log(event.target);
		// <span>2 pizzas</span>
		// console.log(event.currentTarget);
		// <button class="" type="button"><span>2 pizzas</span></button>

		// if ((e.target as HTMLButtonElement).nodeName === "SPAN") {
		// }
		const cb = (prevState: State) => ({ isOpen: !prevState.isOpen });
		this.setState(cb);
	};

	/*
  event.target: es el elemento HTML EN EL QUE SE PRODUCE EL EVENTO
  event.currentTarget: es el elemento HTML DONDE SE ADJUNTA EL CONTROLADOR DE EVENTOS
  */

	render() {
		const renderItems = (items: Item[]) =>
			items.map((item) => (
				<li key={v4()}>
					{item.name} &amp; {item.quantity}
				</li>
			));

		return (
			<AppStateContext.Consumer>
				{({ cart: { items } }) => {
					console.log(items, "items"); // [ { id: 1 , name: '', price: ''}, { ... } ]
					return (
						<div className={CartCSS.cartContainer}>
							<button className={CartCSS.button} type="button" onClick={this.handleClick}>
								<FiShoppingCart />
								<span>{`${items.length} pizzas`}</span>
							</button>
							<div
								className={CartCSS.cartDropDown}
								style={{
									display: this.state.isOpen ? "block" : "none",
								}}
							>
								<ul>{renderItems(items)}</ul>
							</div>
						</div>
					);
				}}
			</AppStateContext.Consumer>
		);
	}
}

export default Cart;
