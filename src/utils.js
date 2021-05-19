import React from "react"

export const format = (x, precision = 0) => {
  return precision
    ? parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parseFloat(x) - parseInt(x)).toFixed(precision).toString().replace('0.', '.')
    : parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const formatSup = (x, precision = 0) => {
  return precision
    ? <span>{parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<sup>{(parseFloat(x) - parseInt(x)).toFixed(precision).toString().replace('0.', '.')}</sup></span>
    : <span>{parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
}


export const formatValue = (value, postfix = '') => {
  return (
    <span>
      {value || '—'}
      {(value && postfix) ? postfix : ''}
    </span>
  )
}