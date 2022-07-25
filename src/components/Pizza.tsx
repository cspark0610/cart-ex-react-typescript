/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { FC, useContext } from "react";
import styles from "./Pizza.module.css";
import { AppSetStateContext, AppStateValue } from "../state/AppState";
import { v4 } from "uuid";

interface Pizza {
	id: number;
	name: string;
	description: string;
	price: number;
}
interface PizzaProps {
	pizza: Pizza;
}

//custom hook
const useSetState = () => {
	const setState = useContext(AppSetStateContext);
	if (!setState) {
		throw new Error("useSetState must be used within a AppStateProvider");
	}
	return setState;
};

const Pizza: FC<PizzaProps> = ({ pizza: { id, description, name, price } }) => {
	const setState = useSetState();

	const handleAddToCartClick = () => {
		const newPizza = { id, name, price };
		const cb = (state: AppStateValue) => {
			const itemExists = state.cart.items.find((item) => item.id === id);

			let quantity: number = itemExists?.quantity
				? (itemExists.quantity = itemExists.quantity + 1)
				: 1;

			return {
				...state,
				cart: {
					...state.cart,
					items: [...state.cart.items, { ...newPizza, quantity: itemExists?.quantity ?? quantity }],
				},
			};
		};
		setState(cb);
	};

	return (
		<li className={styles.container} key={v4()}>
			<h2>{name}</h2>
			<p>{description}</p>
			<p>{price}</p>
			<button type="button" onClick={handleAddToCartClick}>
				Add To Cart
			</button>
		</li>
	);
};

export default Pizza;
