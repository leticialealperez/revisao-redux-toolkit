import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../store/hooks';
import {
	adicionar,
	atualizar,
	excluir,
} from '../store/modules/Contatos/contatosSlice';
import { Contato } from '../types/contact-type';
import { Contexto } from '../types/context-type';

interface ModalProps {
	aberto: boolean;
	fecharModal: () => void;
	contexto: Contexto;
	contato?: Contato;
}

// ? => torna possivelmente indefinido o dado

const Modal: React.FC<ModalProps> = ({
	aberto,
	fecharModal,
	contexto,
	contato,
}) => {
	const [nome, setNome] = useState('');
	const [telefone, setTelefone] = useState('');
	const [email, setEmail] = useState('');

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (contato && contexto === 'atualizar') {
			setNome(contato.nome);
			setTelefone(contato.telefone);
			setEmail(contato.email);
		}
	}, [contexto, contato]);

	const salvar = () => {
		switch (contexto) {
			case 'criar':
				// addOne
				dispatch(
					adicionar({
						nome,
						email,
						telefone,
						favorito: false,
					}),
				);
				limparCampos();
				break;
			case 'atualizar':
				// updateOne
				if (contato) {
					dispatch(
						atualizar({
							id: contato.email,
							changes: {
								...contato,
								email,
								nome,
								telefone,
							},
						}),
					);
				}
				break;
			case 'deletar':
				// deleteOne
				if (contato) {
					dispatch(excluir(contato.email));
				}
				break;
			default:
		}

		fecharModal();
	};

	const limparCampos = () => {
		setNome('');
		setTelefone('');
		setEmail('');
	};

	return (
		<Dialog
			open={aberto}
			onClose={fecharModal}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{contexto === 'criar' && 'Criar Contato'}
				{contexto === 'atualizar' && 'Atualizar Contato'}
				{contexto === 'deletar' && 'Deletar Contato'}
			</DialogTitle>
			<DialogContent>
				{contexto === 'deletar' && (
					<DialogContentText id="alert-dialog-description">
						Você tem certeza que deseja excluir este contato? A ação
						é irreversível.
					</DialogContentText>
				)}
				{contexto !== 'deletar' && (
					<Grid container spacing={2} marginTop={2}>
						<Grid item xs={12}>
							<TextField
								id="nome"
								label="Nome"
								fullWidth
								value={nome}
								onChange={(ev) => setNome(ev.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="email"
								label="E-mail"
								fullWidth
								value={email}
								onChange={(ev) => setEmail(ev.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="telefone"
								label="Telefone"
								fullWidth
								value={telefone}
								onChange={(ev) => setTelefone(ev.target.value)}
							/>
						</Grid>
					</Grid>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={fecharModal}>Cancelar</Button>
				<Button onClick={salvar} autoFocus>
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
