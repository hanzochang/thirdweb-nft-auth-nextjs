import { Box, Flex } from '@chakra-ui/react'
import { ConnectWallet, useUser } from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import type { NextPage } from 'next'
import Link from 'next/link'
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
        <Box position="fixed" w="100%" bottom={0}>
          <Flex
            alignItems="center"
            justifyContent="center"
            mb={6}
            flexDirection="column"
          >
            <Box fontSize={12}>
              <a
                href={`https://goerli.etherscan.io/token/${process.env.NEXT_PUBLIC_NFT_ADDRESS}`}
                style={{ textDecoration: 'underline' }}
              >
                {process.env.NEXT_PUBLIC_NFT_ADDRESS}
              </a>
              のNFTを保有する人のみ
              <Link href="/">
                <a style={{ textDecoration: 'underline' }}>トップページ</a>
              </Link>
              に遷移できます。
            </Box>
            <Box
              as="a"
              pt={2}
              href="https://nftdrop-example.hanzochang.com/"
              target="_blank"
              rel="noreferrer"
              fontSize={12}
              opacity={0.5}
            >
              MINT はこちらから
            </Box>
          </Flex>
        </Box>
      </main>
    </>
  )
}

export default Home
