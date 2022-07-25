import { FC } from "react";
import pizzas from "../data/pizzas.json";
import Pizza from "./Pizza";
import Cart from "./Cart";
import styles from "./App.module.css";
import { ReactComponent as PizzaSVG } from "../svg/pizza.svg";
import AppStateProvider from "../state/AppState";

const App: FC = () => {
	return (
		<AppStateProvider>
			<div className={styles.container}>
				<div className={styles.header}>
					<PizzaSVG width={120} height={120} />
					<div className={styles.title}> Delicious Pizza</div>
					<Cart />
				</div>
				<ul className={styles.pizzaList}>
					{pizzas.map((pizza) => (
						<Pizza key={pizza.id} pizza={pizza} />
					))}
				</ul>
			</div>
		</AppStateProvider>
	);
};

export default App;
