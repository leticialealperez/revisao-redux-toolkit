import { Add } from '@mui/icons-material';
import { Container, Divider, Fab, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import CardContato from '../../components/Card';
import Modal from '../../components/Modal';
import { useAppSelector } from '../../store/hooks';
import { listarTodosContatos } from '../../store/modules/Contatos/contatosSlice';

const Contatos: React.FC = () => {
	const [open, setOpen] = useState(false);
	const contatos = useAppSelector(listarTodosContatos);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Container component="main" sx={{ marginTop: 2 }}>
			<Typography
				variant="h4" // define o estilo
				component="h6" // o elemento
			>
				Contatos
			</Typography>

			<Divider />

			{/* 1 = 8px */}
			{/* 2 = 16px */}
			<Grid container spacing={1} marginTop={2}>
				{contatos.map((contato) => (
					<Grid key={contato.email} item xs={12} sm={6} md={3}>
						<CardContato contato={contato} />
					</Grid>
				))}
			</Grid>

			<Fab
				onClick={() => setOpen(true)}
				color="secondary"
				aria-label="adicionar novo contato"
				sx={{ position: 'fixed', right: '30px', bottom: '30px' }}
			>
				<Add />
			</Fab>

			<Modal aberto={open} contexto="criar" fecharModal={handleClose} />
		</Container>
	);
};

export default Contatos;
