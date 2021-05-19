import React from "react"
import Layout from "@/layouts/Main"
import Promo from "@/components/pages/Promo"
import Introducing from "@/components/pages/Introducing"
import Solutions from "@/components/pages/Solutions"
import Tokenomics from "@/components/pages/Tokenomics"
import Governance from "@/components/pages/Governance"
import Distribution from "@/components/pages/Distribution"

export default () => {
  return (
    <Layout>
      <Promo />
      <Distribution />
      <Introducing />
      <Tokenomics />
      <Solutions />
      <Governance />
    </Layout>
  )
}
