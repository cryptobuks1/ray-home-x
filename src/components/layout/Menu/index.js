import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import style from "./style.module.scss"

export default () => {
  const theme = useSelector((state) => state.settings.theme)
  const dispatch = useDispatch()

  const changeTheme = () => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'theme',
        value: theme === 'default' ? 'dark' : 'default',
      },
    })
  }

  const setTheme = (theme) => {
    document.querySelector('html').setAttribute('data-theme', theme)
  }

  useEffect(() => {
    setTheme(theme)
    // eslint-disable-next-line
  }, [theme])

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

  return (
    <div className={`ray__block ${style.menu}`}>
      <div className={style.menuTop}>
        <div className={style.menuContent}>
          <h2 className="mb-0">
            <strong className="bolder">XRAY</strong> Token
          </h2>
          <div className="text-active">
            Powered with{' '}
            <strong>Cardano</strong>{' '}
            by{' '}
            <strong>Ray Network</strong>
          </div>
        </div>
        <div className={style.menuControls}>
          <div className={style.menuTheme}>
            <div
              role="button"
              tabIndex="0"
              onClick={changeTheme}
              onKeyPress={changeTheme}
            >
              {theme === 'default' && <i className="fe fe-sun" />}
              {theme !== 'default' && <i className="fe fe-moon" />}
            </div>
          </div>
          <div className={style.menuLogo}>
            <a href="https://rraayy.com" target="_blank" rel="noopener noreferrer">
              <img src="/resources/logo.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-3">
        <a
          href="/"
          className={style.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={openRewards}
        >
          <span>Check / Withdraw Rewards</span>
          <span>Check / Withdraw Rewards</span>
        </a>
        <a
          href="https://cardanoscan.io/token/ae2a0aa5a24b27d9868c4a73b7c08077ac21baade5eca0fa467a2bbd58524159"
          className={style.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Explorer <i className="fe fe-arrow-up-right" /></span>
          <span>Explorer <i className="fe fe-arrow-up-right" /></span>
        </a>
        <a
          href="https://rraayy.com/wiki/"
          className={style.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Wiki <i className="fe fe-arrow-up-right" /></span>
          <span>Wiki <i className="fe fe-arrow-up-right" /></span>
        </a>
        <a
          href="https://raywallet.io/"
          className={style.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Ray Wallet <i className="fe fe-arrow-up-right" /></span>
          <span>Ray Wallet <i className="fe fe-arrow-up-right" /></span>
        </a>
      </div>
    </div>
  )
}
