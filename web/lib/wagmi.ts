import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains'

// Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in .env.local for full wallet support
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_WALLETCONNECT_PROJECT_ID'

export const config = getDefaultConfig({
  appName: 'Neo Flash Glow Farcaster',
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
})
