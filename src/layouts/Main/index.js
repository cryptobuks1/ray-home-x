import React from "react"
import { Helmet } from "react-helmet"
import Cookies from '@/components/layout/Cookies'

export default ({ children }) => (
  <div>
    <Helmet titleTemplate="RAY Distribution" title="RAY Distribution">
      <meta property="og:url" content="https://rraayy.com" />
      <meta
        name="description"
        content="Advanced Ecosystem for Cardano Blockchain Platform. All about ADA finances in one place."
      />
    </Helmet>
    {children}
    <Cookies />
  </div>
)
