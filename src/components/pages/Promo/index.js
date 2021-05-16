import React from "react"
import { Button } from "antd"
import { useDispatch } from "react-redux"
import style from "./style.module.scss"

export default () => {
  const dispatch = useDispatch()

  const openPresale = () => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'modalPresale',
        value: true,
      }
    })
  }

  return (
    <div className="ray__block">
      <h1 className={style.text}>
        Send, Stake, Earn, Swap, Fund, Bid.
      </h1>
      <div className="d-flex">
        <div className="mr-4">
          <Button className="ray__button ray__button--large" onClick={openPresale}>
            <i className="fe fe-gift mr-2" />
            Presale
          </Button>
        </div>
        <div className="align-self-center text-active">
          Start: <strong>Q3 2021</strong>
        </div>
      </div>
    </div>
  )
}
