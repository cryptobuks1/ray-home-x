import React from "react"
import Heading from "@/components/layout/Heading"
import style from "./style.module.scss"

export default () => {
  const items = [
    {
      title: 'XRAY Token',
      descr: 'Ray Network governance & payment token',
      url: 'https://x.rraayy.com',
    },
    {
      title: 'Ray Wallet',
      descr: 'A lightweight Cardano multiplatform and multifunctional wallet',
      url: 'https://rraayy.com/ray-wallet',
    },
    {
      title: 'Ray Stake',
      descr: 'Stake solution, earn 5.5% ROI in ADA',
      url: 'https://rraayy.com/stake',
    },
    {
      title: 'Ray Rewards',
      descr: 'Get additional rewards in XRAYs for staking and other activities',
      url: 'https://rraayy.com/rewards',
    },
    {
      title: 'Ray Swap',
      descr: 'Automated liquidity protocol, AMM DEX',
      url: 'https://rraayy.com/swap',
    },
    {
      title: 'Ray KickStart',
      descr: 'Decentralised fundraising',
      url: 'https://rraayy.com/kickstart',
    },
    {
      title: 'Ray NFT Marketplace',
      descr: 'NFT Marketplace with advanced features',
      url: 'https://rraayy.com/nft-marketplace',
    },
    {
      title: 'Ray Data Containers',
      descr: 'B2B data storage and authorization solution',
      url: 'https://rraayy.com/data-containers',
    },
    {
      title: 'Wiki',
      descr: 'Cardano & Ray Network information database',
      url: 'https://rraayy.com/wiki',
    },
    {
      title: 'Tokens List',
      descr: 'Cardano native token list curated by Ray',
      url: 'https://rraayy.com/tokens-list',
    },
    {
      title: 'Cardano-Web3.js',
      descr: 'JavaScript SDK for Cardano blockchain',
      url: 'https://github.com/ray-network/cardano-web3.js',
    },
  ]

  return (
    <div className="ray__block">
      <Heading id="solutions">
        <strong className="bolder">Ray Network</strong> solutions
      </Heading>
      <div className={`row ${style.space}`}>
        {items.map((item, key) => {
          return (
            <div key={key} className="col-md-4 col-sm-6 col-12">
              <div className={style.item}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.itemInner}
                >
                  <i className="fe fe-external-link" />
                  <div className={style.itemInnerTitle}>
                    {item.title}
                  </div>
                  <div>
                    {item.descr}
                  </div>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
