import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

import rootReducer from './modules/rootReducer';

// aqui o Reducer comunica com o persist
const persistorReducer = persistReducer(
	{ key: 'APP_DADOS', storage: localStorage },
	rootReducer,
);

export const appStore = configureStore({
	reducer: persistorReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export const appPeristor = persistStore(appStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
