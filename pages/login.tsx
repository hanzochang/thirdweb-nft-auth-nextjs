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
            justifyContent="center"
          >
            <Box>
              <Box fontSize={24} fontWeight="bold">
                NFT Auth Sample
              </Box>
              <Box fontSize={18} fontWeight="normal" textAlign="center">
                Logged in your NFT
              </Box>
            </Box>
          </Flex>
        </Box>
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <ConnectWallet auth={{ loginOptional: false }} />
        </Flex>
      </main>
    </>
  )
}

export default Home
