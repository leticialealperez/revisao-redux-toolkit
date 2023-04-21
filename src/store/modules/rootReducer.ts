import { combineReducers } from '@reduxjs/toolkit';

import contatosReducer from './Contatos/contatosSlice';
// CRIOU UM NOVO SLICE OU ADAPTER?
// ADICIONA AQUI

const rootReducer = combineReducers({
	contatos: contatosReducer,
	// produtos: () => 'produto',
	// usuarios: () => 'usuarios',
});

export default rootReducer;
