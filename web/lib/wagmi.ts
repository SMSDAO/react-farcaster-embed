import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains'

// Get WalletConnect Project ID — required for WalletConnect connections.
// Create a free project at https://cloud.walletconnect.com and set this env var.
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
if (!projectId && typeof window !== 'undefined') {
  console.warn(
    '[Neo Flash Glow] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. ' +
    'WalletConnect connections will not work. Get a free project ID at https://cloud.walletconnect.com'
  )
}

export const config = getDefaultConfig({
  appName: 'Neo Flash Glow Farcaster',
  projectId: projectId ?? 'demo-project-id-set-NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
})
