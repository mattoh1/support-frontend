package com.gu.support.catalog

case class Pricelist(productRatePlanId: ProductRatePlanId, prices: List[Price])

import com.gu.support.encoding.Codec
import com.gu.support.encoding.Codec._

object Pricelist {
  implicit val codec: Codec[Pricelist] = deriveCodec
}