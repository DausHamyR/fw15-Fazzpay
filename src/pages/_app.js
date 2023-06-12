import '../../styles/globals.css';
import { Provider } from 'react-redux';
import Store from '@/redux/store';

export default function MyApp({ Component, pageProps }) {
    return 
    <Provider Store={Store}>
        <Component {...pageProps} />
    </Provider>;
}