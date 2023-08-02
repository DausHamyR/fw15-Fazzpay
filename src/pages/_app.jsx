import '../../styles/globals.css';
import { Provider } from 'react-redux';
import {store, persistor} from '@/redux/store';
import {PersistGate} from 'redux-persist/integration/react'

export default function MyApp({ Component, pageProps }) {
    return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
    )
}