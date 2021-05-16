import React from "react"
import { Button, Popover } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { Line } from 'react-chartjs-2'
import { range } from "lodash"
import { format } from "@/utils"
import Heading from "@/components/layout/Heading"
import style from "./style.module.scss"

export default () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.settings.theme)
  const { currentEpoch, lastRewardEpoch, rewards } = useSelector((state) => state.settings.delegationRewardsState)
  const isLight = theme === 'default'

  console.log(rewards)

  const openRewards = (e) => {
    e.preventDefault()
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'modalRewards',
        value: true,
      }
    })
  }

  const total = 100000000
  const initialEpoch = 233
  const startEpoch = 270
  const endEpoch = 480
  const diff = endEpoch - startEpoch
  const epochs = range(initialEpoch, endEpoch + 1)
  const perEpoch = total / diff
  const coeff = 0.00476

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const dataMax = {
    labels: epochs.map(epoch => `Epoch ${epoch}`),
    datasets: [
      {
        type: 'line',
        label: 'Max Rewards Per Epoch',
        data: epochs.map((epoch) => {
          const after = parseInt(perEpoch - (perEpoch * coeff * (epoch - startEpoch)))
          return epoch < startEpoch ? null : after
        }),
        fill: true,
        radius: 0,
        backgroundColor: [
          'rgba(54, 162, 235, 0.15)',
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
      },
      {
        type: 'bar',
        label: 'Total Rewards Distributed',
        data: epochs.map((epoch) => {
          const amount = randomInteger(13000, 22000)
          return epoch <= 263 ? amount : null
        }),
        fill: true,
        stepped: 'before',
        radius: 0,
        backgroundColor: [
          'rgba(54, 162, 235, 0.47',
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
      },
    ]
  }

  // const dataDistr = {
  //   labels: epochs.slice(0, 20).map(epoch => `${epoch}`),
  //   datasets: [
  //     {
  //       label: 'Distributed in Epoch',
  //       data: epochs.slice(0, 20).map(epoch => parseInt(perEpoch - (perEpoch * coeff * (epoch - startEpoch)))),
  //       fill: true,
  //       stepped: 'before',
  //       radius: 0,
  //       border: 2,
  //       backgroundColor: [
  //         'rgba(54, 162, 235, 0.3)',
  //       ],
  //       hoverBackgroundColor: [
  //         'rgba(54, 162, 235, 0.8)',
  //       ],
  //       borderColor: [
  //         'rgba(54, 162, 235, 0.8)',
  //       ],
  //     },
  //   ]
  // }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      axis: 'x'
    },
    scales: {
      x: {
        grid: {
          color: isLight ? '#e4e9f0' : '#232236',
        },
        ticks: {
          autoSkip: true,
          color: isLight ? '#8484AD' : '#4f4f7a',
        }
      },
      y: {
        grid: {
          color: isLight ? '#e4e9f0' : '#232236',
        },
        ticks: {
          color: isLight ? '#8484AD' : '#4f4f7a',
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (data) => {
            const amount = data.dataset.data[data.dataIndex]
            return amount ? `${data.dataset.label}: ${format(amount)} XRAY` : `0 XRAY`
          },
        }
      }
    }
  }

  return (
    <div className="ray__block">
      <Heading id="activities">
        <strong className="bolder">Distribution</strong> activities
      </Heading>
      <div className={style.item}>
        <div className={`${style.point} ${style.pointActive}`}>1</div>
        <div className={style.line} />
        <div className="mb-3">
          <h3 className="mb-0">
            <span className="mr-2">Stake Delegators</span>
            <span className="badge badge-success align-middle">Active</span>
          </h3>
          <div className="text-active">
            101,538,200{' '}
            <span className="ray__ticker">XRAY</span>
          </div>
        </div>
        <div className="pt-4">
          <p className="mb-3">
            <strong className="text-active">Distribution Info</strong>
          </p>
          <p>
            Delegate your ADA to Ray Network pools and receive rewards in ADA and XRAY.
            <br />
            Use Ray Wallet, Yoroi, Adalite or Daedalus to delegate. Please do not use exchanges or centralized wallets, your rewards may be lost.{' '}
            <a href="https://rraayy.com/stake/" target="_blank" rel="noopener noreferrer">Pools list &rarr;</a>
          </p>
          <ul className="mb-5">
            <li>5.5% ROI in ADA per epoch</li>
            <li>
              100,000,000{' '}
              <span className="ray__ticker">XRAY</span>{' '}
              in ~3 years;{' '}
              <Popover
                content={(
                  <div className="ray__info">
                    <div className="ray__info__label">Epoch 233-270</div>
                    <ul className="mb-2">
                      <li>
                        <strong>Rewards Rate:</strong> 1{' '}
                        <span className="ray__ticker">XRAY</span>{' '}
                        per 50 {' '}
                        <span className="ray__ticker">ADA</span>
                      </li>
                    </ul>
                    <div className="ray__info__label">Epoch 270-480</div>
                    <ul>
                      <li>
                        <strong>Start Epoch Rewards:</strong> 476,190{' '}
                        <span className="ray__ticker">XRAY</span>{' '}
                        / epoch
                      </li>
                      <li><strong>Decrease:</strong> -0.476% each epoch</li>
                      <li><strong>Share:</strong> (delegator_stake / pools_stake) * epoch_reward</li>
                      <li>
                        <strong>Max Rewards Rate:</strong> 1{' '}
                        <span className="ray__ticker">XRAY</span>{' '}
                        per{' '}
                        50 {' '}
                        <span className="ray__ticker">ADA</span>
                      </li>
                    </ul>
                  </div>
                )}
              >
                <span className="ray__details">distribution rules</span>
              </Popover>
            </li>
            <li>
              1,538,200 {' '}
              <span className="ray__ticker">XRAY</span>{' '}
              to early delegators;{' '}
              <Popover
                content={(
                  <div className="ray__info">
                    <div className="ray__info__label">Epoch 233-270</div>
                    <ul>
                      <li>
                        <strong>Total Rewards:</strong> 1,538,200{' '}
                        <span className="ray__ticker">XRAY</span>
                      </li>
                      <li><strong>Share:</strong> total / total_staked * user_total_stake</li>
                    </ul>
                  </div>
                )}
              >
                <span className="ray__details">distribution rules</span>
              </Popover>
            </li>
            <li>All unrealized tokens will be burned in Epoch 485</li>
          </ul>
          <p className="mb-3">
            <strong className="text-active">Current Epoch:  {currentEpoch}; Last Rewarded Epoch: {lastRewardEpoch}</strong>
          </p>
          <div className="mb-5">
            <Line data={dataMax} options={options} height={300} />
          </div>
          {/* <p>
            <strong className="text-active">Distributed Total: 215,125 XRAY</strong>
          </p>
          <div>
            <Bar data={dataDistr} options={options} height={250} />
          </div> */}
          <div className={style.controls}>
            <div className="mr-4">
              <a href="https://raywallet.io/#/stake" target="_blank" rel="noopener noreferrer" className="ray__button">Delegate ADA</a>
            </div>
            <div className="align-self-center">
              <a href="/" onClick={openRewards}>
                Withdraw{' '}
                <span className="d-none d-sm-inline">Rewards</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={style.item}>
        <div className={style.point}>2</div>
        <div className={style.line} />
        <div className="mb-3">
          <h3 className="mb-0">
            <span className="mr-2">Presale</span>
            <span className="badge badge-token align-middle">Scheduled</span>
          </h3>
          <div className="text-active">
            18,764,260{' '}
            <span className="ray__ticker">XRAY</span>
          </div>
        </div>
        <div className="pt-4">
          <p>
            Sale of 33% of the development fund for further development.
          </p>
          <div className="d-flex">
            <div className="mr-4">
              <Button className="ray__button" disabled>
                Buy XRAY
              </Button>
            </div>
            <div className="align-self-center text-active">
              Start: <strong>Q3 2021</strong>
            </div>
          </div>
        </div>
      </div>
      <div className={style.item}>
        <div className={style.point}>3</div>
        <div className={style.line} />
        <div className="mb-3">
          <h3 className="mb-0">
            <span className="mr-2">Liquidity Providers</span>
            <span className="badge badge-token align-middle">In Development</span>
          </h3>
          <div className="text-active">
            134,030,424{' '}
            <span className="ray__ticker">XRAY</span>
          </div>
        </div>
        <div className="pt-4">
          <p className="mb-4">
            Support for liquidity providers. To be announced after the release of Ray Swap.
          </p>
          <div className="d-flex">
            <div className="mr-4">
              <Button className="ray__button" disabled>
                Provide Liquidity
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.item}>
        <div className={style.point}>4</div>
        <div className={style.line} />
        <div className="mb-3">
          <h3 className="mb-0">
            <span className="mr-2">KickStart Distribution</span>
            <span className="badge badge-token align-middle">In Development</span>
          </h3>
          <div className="text-active">
            81,230,560{' '}
            <span className="ray__ticker">XRAY</span>
          </div>
        </div>
        <div className="pt-4">
          <p>
            IDE token distribution. To be announced after the release of Ray KickStart.
          </p>
          <ul className="mb-4">
            <li>ADA/XRAY pair</li>
            <li>Locking funds in a smart contract for 6, 12, 18 months with an option to cancel the purchase at any time with a 30%, 20%, 10% penalty</li>
            <li>All unrealized and returned tokens will be burned</li>
          </ul>
          <div className="d-flex">
            <div className="mr-4">
              <Button className="ray__button" disabled>
                Buy XRAY
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
