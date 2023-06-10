import Layout from '@/components/layout';
import { store } from '@/store/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ToastContainer hideProgressBar position="top-center" />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
