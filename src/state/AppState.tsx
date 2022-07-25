import {
	createContext,
	Dispatch,
	FC,
	ReactElement,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

export interface AppStateValue {
	cart: {
		items: { id: number; name: string; price: number; quantity: number }[];
	};
}

export interface Item {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

const initialStateValue: AppStateValue = {
	cart: {
		items: [],
	},
};

//this context will keep the value of the state of the app, defined as AppStateValue
export const AppStateContext = createContext(initialStateValue);
export const AppSetStateContext = createContext<
	Dispatch<SetStateAction<AppStateValue>> | undefined
>(undefined);

// crear un componente AppStateProvider TAG que va a envolver a todos los componentes que quieran acceder al state
interface Props {
	children: ReactElement | ReactNode | any;
}
const AppStateProvider: FC<Props> = ({ children }: Props) => {
	const [state, setState] = useState(initialStateValue);

	return (
		<AppStateContext.Provider value={state}>
			<AppSetStateContext.Provider value={setState}>{children}</AppSetStateContext.Provider>
		</AppStateContext.Provider>
	);
};

export default AppStateProvider;
