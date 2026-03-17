'use client'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const MOCK_AIRDROPS = [
  { name: 'DEGEN Token', protocol: 'Farcaster', amount: '1,000 DEGEN', eligible: true, deadline: '2024-06-30', logo: '🟣', chain: 'Base' },
  { name: 'Optimism OP', protocol: 'Optimism', amount: '250 OP', eligible: false, deadline: 'Closed', logo: '🔴', chain: 'Optimism' },
  { name: 'ARB Token', protocol: 'Arbitrum', amount: '500 ARB', eligible: true, deadline: '2024-07-15', logo: '🔵', chain: 'Arbitrum' },
  { name: 'Base Token', protocol: 'Base', amount: 'TBD', eligible: null, deadline: 'TBD', logo: '🟦', chain: 'Base' },
  { name: 'Uniswap UNI', protocol: 'Uniswap', amount: '400 UNI', eligible: false, deadline: 'Closed', logo: '🦄', chain: 'Ethereum' },
]

export default function AirdropPage() {
  const [address, setAddress] = useState('')
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const { address: connectedAddress } = useAccount()

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setChecked(true)
    setLoading(false)
  }

  const checkAddress = address || connectedAddress || ''

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white" style={{textShadow:'0 0 15px rgba(0,255,136,0.5)'}}>
          🪂 Airdrop Checker
        </h1>
        <p className="text-slate-400 mt-1">Check your wallet eligibility for the latest crypto airdrops</p>
      </div>

      {/* Wallet Check Form */}
      <div className="neo-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Check Eligibility</h2>
          {!connectedAddress && <ConnectButton />}
        </div>

        {connectedAddress && (
          <div className="mb-4 p-3 rounded-lg bg-green-400/5 border border-green-400/20 text-sm">
            <span className="text-green-400">✓ Connected: </span>
            <code className="text-slate-300 text-xs">{connectedAddress}</code>
          </div>
        )}

        <form onSubmit={handleCheck} className="flex gap-3">
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder={connectedAddress || "0x... or ENS name"}
            className="neo-input flex-1"
          />
          <button type="submit" disabled={loading || !checkAddress} className="neo-btn-primary whitespace-nowrap" style={{borderColor:'#00ff88', color:'#00ff88', boxShadow:'0 0 15px rgba(0,255,136,0.3)'}}>
            {loading ? 'Checking...' : 'Check'}
          </button>
        </form>
      </div>

      {/* Results */}
      {checked && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">Results for</h2>
            <code className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
              {checkAddress.slice(0, 6)}...{checkAddress.slice(-4)}
            </code>
          </div>

          <div className="grid gap-4">
            {MOCK_AIRDROPS.map(a => (
              <div key={a.name} className={`neo-card p-5 flex items-center gap-4 ${a.eligible === true ? 'border-green-400/30' : a.eligible === false ? 'border-slate-700/50 opacity-60' : 'border-yellow-400/20'}`}>
                <div className="text-3xl">{a.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{a.name}</h3>
                    <span className="text-xs text-slate-500">{a.chain}</span>
                  </div>
                  <p className="text-sm text-slate-400">{a.protocol} · Deadline: {a.deadline}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold mb-1 ${a.eligible === true ? 'text-green-400' : a.eligible === false ? 'text-slate-500' : 'text-yellow-400'}`}>
                    {a.eligible === true ? '✓ Eligible' : a.eligible === false ? '✗ Not Eligible' : '? Unknown'}
                  </div>
                  <div className="text-xs text-slate-500">{a.amount}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="neo-card p-4 text-sm text-slate-500">
            <p>⚠️ Results are for demonstration purposes. Connect your real wallet and integrate with actual airdrop APIs for live eligibility data.</p>
          </div>
        </div>
      )}

      {/* Upcoming Airdrops */}
      {!checked && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Active Airdrops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_AIRDROPS.filter(a => a.deadline !== 'Closed').map(a => (
              <div key={a.name} className="neo-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{a.logo}</span>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{a.name}</h3>
                    <p className="text-xs text-slate-500">{a.chain}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400">Deadline: <span className="text-cyan-400">{a.deadline}</span></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
