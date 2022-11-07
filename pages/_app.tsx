import { ChakraProvider } from '@chakra-ui/react'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import type { AppProps } from 'next/app'
import GoogleTagManager, {
  GoogleTagManagerId,
} from '../partials/GoogleTagManager'
import { googleTagManagerId } from '../utils/gtm'
import { theme } from '../utils/theme'

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      authConfig={{
        domain: 'example.org',
        authUrl: '/api/auth',
        loginRedirect: '/',
      }}
    >
      <ChakraProvider theme={theme.templateTheme}>
        {/* <GoogleTagManager
          googleTagManagerId={googleTagManagerId as GoogleTagManagerId}
        /> */}
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  )
}

export default MyApp
