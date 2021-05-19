import React, { useState } from 'react'
import { Modal, Input, Button, Tooltip, message, Alert } from 'antd'
import { Bar } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import { CopyToClipboard } from "react-copy-to-clipboard"
import { format } from "@/utils"
import style from './style.module.scss'

const RewardsModal = () => {
  const dispatch = useDispatch()
  const modalRewards = useSelector((state) => state.settings.modalRewards)
  const theme = useSelector((state) => state.settings.theme)
  const isLight = theme === 'default'
  const [address, setAddress] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [rewards, setRewards] = useState({})

  const dataset = rewards.rewardsHistory || []
  const datasetProcessed = [...dataset].reverse()

  const chartData = {
    labels: datasetProcessed.map(epoch => epoch.forDelegationInEpoch),
    datasets: [
      {
        type: 'bar',
        label: 'Epoch Rewards',
        maxBarThickness: 5,
        data: datasetProcessed.map(epoch => epoch.amount),
        fill: true,
        radius: 0,
        width: 2,
        backgroundColor: [
          'rgba(54, 162, 235, 0.4',
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        postfix: 'XRAY',
      },
      {
        type: 'bar',
        label: 'Snapshot',
        hidden: true,
        maxBarThickness: 5,
        data: datasetProcessed.map(epoch => epoch.snapshot / 1000000),
        radius: 0,
        width: 2,
        backgroundColor: [
          'rgba(54, 162, 235, 0.4',
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        postfix: 'XRAY',
      },
      {
        type: 'bar',
        label: 'ADA per 1 XRAY',
        hidden: true,
        maxBarThickness: 5,
        data: datasetProcessed.map(epoch => epoch.perXray / 1000000),
        radius: 0,
        width: 2,
        backgroundColor: [
          'rgba(54, 162, 235, 0.4',
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        postfix: 'ADA',
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
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem) => `Epoch ${tooltipItem[0].label} (for Epoch ${parseInt(tooltipItem[0].label) - 2})`,
          label: (tooltipItem) => chartData.datasets.map(ds => `${ds.label}: ${ds.data[tooltipItem.dataIndex]} ${ds.postfix}`)
        }
      },
    }
  }

  const handleCancel = () => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'modalRewards',
        value: false,
      },
    })
    clear()
  }

  const fetchData = (e) => {
    e.preventDefault()
    if (address) {
      setLoading(true)
      // fetch(`http://localhost:8080/rewards/delegation/state/${address}`)
      fetch(`https://graphql-helper.rraayy.com/rewards/delegation/state/${address}`)
        .then((response) => response.json())
        .then((data) => {
          setRewards(data)
          setLoading(false)
          setStep(2)
        })
        .catch(() => {
          message.error('Something went wrong')
          setLoading(false)
          setStep(1)
        })
    } else {
      message.warning('Please enter wallet address')
    }
  }

  const generateWallet = (e) => {
    e.preventDefault()
  }

  const clear = () => {
    setAddress('')
    setStep(1)
  }

  return (
    <Modal centered title="Withdraw Rewards" footer={null} visible={modalRewards} onCancel={handleCancel} width={440}>
      {step === 1 && (
        <div>
          <div className="ray__form__label">
            Your Wallet Address
          </div>
          <div className="mb-4">
            <Input value={address} placeholder="addr1..." size="large" onChange={(e) => setAddress(e.target.value)} />
          </div>
          <Button loading={loading} type="primary" className="ray__button w-100" onClick={fetchData}>
            Next
          </Button>
        </div>
      )}
      {step === 2 && (
        <div>
          {!rewards.found && (
            <div>
              <div className="mb-4">
                <Alert
                  type="warning"
                  showIcon
                  message="Address not found"
                  description="Try using a different address. This address must have been previously used for any transaction"
                />
              </div>
              <Tooltip title="Soon">
                <Button type="primary" className="ray__button w-100" onClick={clear}>
                  Try again
                </Button>
              </Tooltip>
            </div>
          )}
          {rewards.found && (
            <div>
              {!rewards.rewardsHistory?.length && (
                <div className="mb-3">
                  <Alert type="warning" showIcon message="Stake is not matured" description="Please wait for the next epoch to receive your XRAY rewards" />
                </div>
              )}
              <div className="row mb-3">
                <div className="col-6">
                  <div className="ray__form__label">
                    Total Rewards
                  </div>
                  <div>
                    <div className={style.key}>
                      {format(rewards.total)}{' '}
                      <span className="ray__ticker">XRAY</span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="ray__form__label">
                    Early Delegator Bonus
                  </div>
                  <div className={style.key}>
                    {format(rewards.totalEarlyBonus)}{' '}
                    <span className="ray__ticker">XRAY</span>
                  </div>
                </div>
              </div>
              <div className="ray__form__label">
                {rewards.isAddress && 'Withdrawal address'}
                {!rewards.isAddress && 'Stake key'}
              </div>
              <div className="mb-3">
                <div className={style.key}>
                  {address.slice(0, 8)}...{address.slice(-12)}{' '}
                  <CopyToClipboard
                    text={address}
                    onCopy={() => message.success('Copied to clipboard')}
                  >
                    <Tooltip title="Copy">
                      <i className="fe fe-copy ray__copy" />
                    </Tooltip>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="ray__line" />
              <div>
                <div className="ray__form__label">
                  Rewards History by Epoch
                </div>
                <div>
                  <Bar data={chartData} options={options} height={140} />
                </div>
              </div>
              {rewards.isAddress && (
                <div className="mt-4">
                  <Tooltip title={(
                    <div className="text-center">Withdrawals will be available after Epoch 275</div>
                  )}
                  >
                    <a href="/" disabled type="primary" className="ray__button w-100" onClick={generateWallet}>
                      Withdraw
                    </a>
                  </Tooltip>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}

export default RewardsModal
