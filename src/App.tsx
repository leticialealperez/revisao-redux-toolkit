import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppRoutes from './configs/routes/AppRoutes';
import { appPeristor, appStore } from './store';

function App() {
	return (
		<Provider store={appStore}>
			<PersistGate persistor={appPeristor}>
				<AppRoutes />
			</PersistGate>
		</Provider>
	);
}

export default App;
