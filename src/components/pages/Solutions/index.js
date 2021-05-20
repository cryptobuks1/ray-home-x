import React from "react"
import Heading from "@/components/layout/Heading"
import style from "./style.module.scss"

export default () => {
  const items = [
    {
      title: 'Ray Wallet',
      descr: 'A lightweight Cardano multiplatform and multifunctional wallet',
      url: 'https://raywallet.io',
    },
    {
      title: 'Ray Stake',
      descr: 'Stake solution, earn 5.5% ROI in ADA',
      url: 'https://raywallet.io/#/stake',
    },
    {
      title: 'Ray Rewards',
      descr: 'Get additional rewards in XRAYs for staking and other activities',
      url: 'https://raywallet.io/#/rewards',
    },
    {
      title: 'Ray Swap',
      descr: 'Automated liquidity protocol, AMM DEX',
      url: 'https://rayswap.org',
    },
    {
      title: 'Ray KickStart',
      descr: 'Decentralized fundrising',
      url: 'https://raywallet.io/#/kickstart',
    },
    {
      title: 'Ray NFT',
      descr: 'NFT Marketplace with advanced features',
      url: 'https://raywallet.io/#/nft',
    },
    {
      title: 'Ray Token',
      descr: 'Ray Network governance & payment token',
      url: 'https://token.rraayy.com',
    },
    {
      title: 'Ray Data',
      descr: 'B2B data storage and authorization solution',
      url: 'https://rraayy.com/data-containers/',
    },
    {
      title: 'Cardano-Web3.js',
      descr: 'JavaScript SDK for Cardano blockchain',
      url: 'https://github.com/ray-network/cardano-web3.js',
    },
  ]

  return (
    <div className="ray__block mb-4 pb-3">
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
