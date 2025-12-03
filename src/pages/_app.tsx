import Layout from '@/components/layout';
import { store } from '@/store/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const isLoginPage = router.pathname === '/login';

	return (
		<Provider store={store}>
			<ToastContainer hideProgressBar position="top-center" />
			{isLoginPage ? (
				<Component {...pageProps} />
			) : (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
		</Provider>
	);
}
