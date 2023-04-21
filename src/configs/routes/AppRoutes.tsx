import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Contatos from '../../pages/Contatos';

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Contatos />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
