// SLICE QUE MANIPULA UM ARRAY

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { Contato } from '../../../types/contact-type';

// const valorInicial: Contato[] = [];

// const contatosSlice = createSlice({
// 	initialState: valorInicial,
// 	name: 'Contatos',
// 	reducers: {
// 		adicionar: (state, action: PayloadAction<Contato>) => {
// 			// é possivel usar um push? NAO!
// 			// local => setState((prevState) => [...prevState, novoDado])

// 			// dois contatos com o mesmo email

// 			if (state.some((c) => c.email === action.payload.email)) {
// 				return state;
// 			}

// 			return [...state, action.payload];
// 		},
// 		excluir: (state, action: PayloadAction<{ email: string }>) => {
// 			// aqui deverá buscar o indice que será removido ...
// 			// a lógica é por conta do dev
// 			const novoState = state.filter(
// 				(c) => c.email !== action.payload.email,
// 			);

// 			return novoState;
// 		},
// 		atualizar: (
// 			state,
// 			action: PayloadAction<{
// 				novasInformacoes: Partial<Contato>;
// 				email: string;
// 			}>,
// 		) => {
// 			// posicao do Item que preciso atualizar
// 			const indice = state.findIndex(
// 				(c) => c.email === action.payload.email,
// 			);

// 			const novaLista = [...state];

// 			// só alterar aquilo que foi de fato alterado
// 			novaLista[indice].email =
// 				action.payload.novasInformacoes.email ??
// 				novaLista[indice].email;
// 			novaLista[indice].telefone =
// 				action.payload.novasInformacoes.telefone ??
// 				novaLista[indice].telefone;
// 			novaLista[indice].nome =
// 				action.payload.novasInformacoes.nome ?? novaLista[indice].nome;

// 			return novaLista;
// 		},
// 	},
// });

// export const contatoReducer = contatosSlice.reducer;
// export default contatosSlice.actions;

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { Contato } from '../../../types/contact-type';

// aqui informamos qual será a chave única que definirá que esse contato é unico
const adapterContato = createEntityAdapter<Contato>({
	selectId: (item) => item.email,
});

// duas funções - LISTA TODOS OS CONTATOS
export const { selectAll: listarTodosContatos, selectById: listaPorEmail } =
	adapterContato.getSelectors((state: RootState) => state.contatos);

const contatosSlice = createSlice({
	name: 'sliceName',
	initialState: adapterContato.getInitialState(),
	reducers: {
		adicionar: adapterContato.addOne,
		atualizar: adapterContato.updateOne,
		excluir: adapterContato.removeOne,
	},
});

export const { excluir, adicionar, atualizar } = contatosSlice.actions;
export default contatosSlice.reducer;
