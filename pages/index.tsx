import { Box, Flex } from '@chakra-ui/react'
import { ConnectWallet, useUser } from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import type { NextPage } from 'next'
import { getUser } from '../auth.config'
import { Seo } from '../partials/index/Seo'

const Home: NextPage = () => {
  const { user } = useUser()
  console.log(user)

  return (
    <>
      <Seo />
      <main>
        <Box position="fixed" w="100%">
          <Flex
            px={{ base: 6, '2xl': 0 }}
            maxW="8xl"
            mx="auto"
            mt={6}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Box fontSize={24} fontWeight="bold">
                NFT Auth Sample
              </Box>
            </Box>
            <ConnectWallet auth={{ loginOptional: false }} />
          </Flex>
        </Box>
        <Flex
          justifyContent="center"
          alignItems="center"
          h="100vh"
          textAlign="center"
        >
          Logged in
          <br />
          あなたはNFTを保有しているのでこのページが見えています
        </Flex>
        <Box position="fixed" w="100%" bottom={0}>
          <Flex
            alignItems="center"
            justifyContent="center"
            mb={6}
            flexDirection="column"
          >
            <Box fontSize={12} textAlign="center">
              <a
                href={`https://goerli.etherscan.io/token/${process.env.NEXT_PUBLIC_NFT_ADDRESS}`}
                style={{ textDecoration: 'underline' }}
              >
                {process.env.NEXT_PUBLIC_NFT_ADDRESS}
              </a>
              のNFTを保有する人のみ表示されています。
              <br />
            </Box>
          </Flex>
        </Box>
      </main>
    </>
  )
}

export default Home

// This gets called on every request
export const getServerSideProps = async (context: any) => {
  const user = await getUser(context.req)

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // Ensure we are able to generate an auth token using our private key instantiated SDK
  const PRIVATE_KEY = process.env.PRIVATE_KEY
  if (!PRIVATE_KEY) {
    throw new Error('You need to add an PRIVATE_KEY environment variable.')
  }

  // Instantiate our SDK
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY as string,
    'goerli'
  )

  // Check to see if the user has an NFT
  const hasNft = await addressHasNft(sdk, user.address)

  // If they don't have an NFT, redirect them to the login page
  if (!hasNft) {
    console.log('User', user.address, "doesn't have an NFT! Redirecting...")
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // Finally, return the props
  return {
    props: {},
  }
}

const addressHasNft = async (sdk: ThirdwebSDK, address: string) => {
  const nftDrop = await sdk.getContract(
    process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
    'nft-drop'
  )
  console.log(
    'process.env.NEXT_PUBLIC_NFT_ADDRESS',
    process.env.NEXT_PUBLIC_NFT_ADDRESS
  )

  const balance = await nftDrop.balanceOf(address)

  return balance.gt(0)
}
