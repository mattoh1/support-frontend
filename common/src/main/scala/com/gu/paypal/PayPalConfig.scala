package com.gu.paypal

import com.gu.config.{Stage, TouchpointConfig, TouchpointConfigProvider}
import com.typesafe.config.Config

case class PayPalConfig(
  payPalEnvironment: String,
  NVPVersion: String,
  url: String,
  user: String,
  password: String,
  signature: String
) extends TouchpointConfig

class PayPalConfigProvider(defaultStage: Stage, config: Config) extends TouchpointConfigProvider[PayPalConfig](defaultStage, config) {
  def fromConfig(config: Config): PayPalConfig = {
    PayPalConfig(
      config.getString("paypal.paypal-environment"),
      config.getString("paypal.nvp-version"),
      config.getString("paypal.url"),
      config.getString("paypal.user"),
      config.getString("paypal.password"),
      config.getString("paypal.signature")
    )
  }
}
