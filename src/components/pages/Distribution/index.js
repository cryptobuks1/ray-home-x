import React, { useState, useEffect } from "react"
import { Button, Popover } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { Line } from 'react-chartjs-2'
import { format } from "@/utils"
import Heading from "@/components/layout/Heading"
import style from "./style.module.scss"

export default () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.settings.theme)
  const isLight = theme === 'default'
  const [rewards, setRewards] = useState({
    currentEpoch: 0,
    distributed: [],
    totalAccrued: 0,
    totalUndelivered: 0,
  })
  const { distributed } = rewards

  const fetchData = () => {
    console.log('fetch')
    // fetch(`http://localhost:8080/rewards/delegation/state/`)
    fetch(`https://graphql-helper.rraayy.com/rewards/delegation/state/`)
      .then((response) => response.json())
      .then((data) => {
        setRewards(data)
      })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-nextline
  }, [])

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

  console.log(rewards)

  const chartData = {
    labels: distributed.map(epoch => epoch.epoch),
    datasets: [
      {
        type: 'line',
        label: 'Max Rewards',
        data: distributed.map(epoch => epoch.maxRewards),
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
        postfix: 'XRAY',
      },
      {
        type: 'bar',
        label: 'Epoch Rewards Distributed',
        data: distributed.map(epoch => epoch.xray),
        fill: true,
        stepped: 'before',
        radius: 0,
        backgroundColor: [
          'rgba(54, 162, 235, 1',
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        postfix: 'XRAY',
      },
    ]
  }

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
          title: (tooltipItem) => `Epoch ${tooltipItem[0].label} (for Epoch ${parseInt(tooltipItem[0].label) - 2})`,
          label: (tooltipItem) => {
            const { datasetIndex } = tooltipItem
            const ds = chartData.datasets[datasetIndex]
            const arr = []
            arr.push(`${ds.label}: ${ds.data[tooltipItem.dataIndex]} ${ds.postfix}`)
            datasetIndex === 1 && arr.push(`ADA per 1 XRAY: ${distributed[tooltipItem.dataIndex].rate / 1000000} ADA`)
            return arr
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
            <a href="https://rraayy.com/stake/" target="_blank" rel="noopener noreferrer">Pools list <i className="fe fe-arrow-up-right" /></a>
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
                    <div className="ray__info__label">Epoch 235-500</div>
                    <ul>
                      <li>
                        <strong>Total:</strong> 100,000,000
                        <span className="ray__ticker">XRAY</span>{' '}
                      </li>
                      <li>
                        <strong>Epoch Rewards:</strong> 888,888{' '}
                        <span className="ray__ticker">XRAY</span>{' '}
                        / epoch
                      </li>
                      <li><strong>Decrease:</strong> -0.444% each epoch</li>
                      <li><strong>Decrease from Epoch:</strong> 275</li>
                      <li>
                        <strong>Max Rewards Rate:</strong> 1{' '}
                        <span className="ray__ticker">XRAY</span>{' '}
                        per{' '}
                        50 {' '}
                        <span className="ray__ticker">ADA</span>
                      </li>
                      <li><strong>Epoch Share:</strong> (delegator_stake / pools_stake) * epoch_reward</li>
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
                    <div className="ray__info__label">Epoch 235-275</div>
                    <ul>
                      <li>
                        <strong>Total Rewards:</strong> 1,538,200{' '}
                        <span className="ray__ticker">XRAY</span>
                      </li>
                      <li><strong>Share:</strong> (rewards / accum_pools_stake) * accum_delegator_stake</li>
                    </ul>
                  </div>
                )}
              >
                <span className="ray__details">distribution rules</span>
              </Popover>
            </li>
            <li>All unrealized tokens will be burned in Epoch 505</li>
          </ul>
          <p className="mb-0">
            <strong className="text-active">Distribution Data</strong>
          </p>
          <p className="mb-3">
            <strong className="text-active">
              Current Epoch: {rewards.currentEpoch};{' '}
              Total Accrued: {format(rewards.totalAccrued)}{' '}
              <span className="ray__ticker">XRAY</span>;{' '}
              Undelivered: {format(rewards.totalUndelivered)}{' '}
              <span className="ray__ticker">XRAY</span>
            </strong>
          </p>
          <div className="mb-5">
            <Line data={chartData} options={options} height={300} />
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
