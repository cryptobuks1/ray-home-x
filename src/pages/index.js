import React from "react"
import { Helmet } from "react-helmet"
import Layout from "@/layouts/Main"
import Main from "@/components/pages/Main"

export default () => {
  return (
    <Layout>
      <Helmet title="Cardano Ecosystem" />
      <Main />
    </Layout>
  )
}
