import { Delete, Edit, Favorite, FavoriteBorder } from '@mui/icons-material';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	IconButton,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch } from '../store/hooks';
import { atualizar } from '../store/modules/Contatos/contatosSlice';
import { Contato } from '../types/contact-type';
import { Contexto } from '../types/context-type';
import Modal from './Modal';

interface CardContatoProps {
	contato: Contato;
}

const CardContato: React.FC<CardContatoProps> = ({ contato }) => {
	const [open, setOpen] = useState(false);
	const [contexto, setContexto] = useState<Contexto>('criar');

	const dispatch = useAppDispatch();

	const handleClick = (context: Contexto) => {
		setContexto(context);
		setOpen(true);
	};

	const favoritar = () => {
		// updateOne
		dispatch(
			atualizar({
				id: contato.email,
				changes: { favorito: !contato.favorito },
			}),
		);
	};

	return (
		<>
			<Card>
				<CardHeader title={contato.nome} subheader={contato.email} />
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{contato.telefone}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton
						aria-label="adicionar aos favoritos"
						onClick={favoritar}
					>
						{contato.favorito ? (
							<Favorite color="error" />
						) : (
							<FavoriteBorder />
						)}
					</IconButton>
					<IconButton
						aria-label="deletar o contato"
						onClick={() => handleClick('deletar')}
					>
						<Delete color={'warning'} />
					</IconButton>
					<IconButton
						aria-label="atualizar o contato"
						onClick={() => handleClick('atualizar')}
					>
						<Edit color={'success'} />
					</IconButton>
				</CardActions>
			</Card>

			<Modal
				aberto={open}
				contexto={contexto}
				fecharModal={() => setOpen(false)}
				contato={contato}
			/>
		</>
	);
};

export default CardContato;
