"use client";

import CurrencyConversionCard from "@/components/CurrencyConversionCard";
import React, { ComponentProps, useCallback, useMemo } from "react";
import { Container } from "react-bootstrap";
import styles from "@/styles/conversion.module.scss";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { usePairsQuery } from "@/store/api";
import queryString from "query-string";
import { IoMdClose } from "react-icons/io";

// TODO: 優化
// export async function generateStaticParams() {
//   const items: PairsData[] = await fetch(
//     "https://65efcc68ead08fa78a50f929.mockapi.io/api/v1/"
//   ).then((res) => {
//     console.log(res);
//     res.json();
//   });
//   console.log(items);
//   console.log("generateStaticParams");
//   return [];
//   return items.map((item) => ({
//     slug: item.currency,
//   }));
// }

type Props = {};

function Conversion({}: Props) {
  const param = useParams<{ slug: string[] }>();

  const { data } = usePairsQuery({});

  const router = useRouter();

  const cardProps = useMemo<
    ComponentProps<typeof CurrencyConversionCard> | undefined
  >(() => {
    if (!data) {
      return undefined;
    }

    const ids = param.slug;

    const from = data.find(({ id }) => id === ids[0]);

    const to = data.find(({ id }) => id === ids[1]);

    if (ids[0] === ids[1]) {
      return undefined;
    }

    if (!from || !to) {
      return undefined;
    }

    return {
      fromLabel: from.currency,
      fromIcon: from.currency_icon,
      fromFraction: Number(from.amount_decimal),
      fromWeight: from.twd_price,
      toIcon: to.currency_icon,
      toLabel: to.currency,
      toFraction: Number(to.amount_decimal),
      toWeight: to.twd_price,
      onClickFrom: () =>
        router.push(
          queryString.stringifyUrl({
            url: "/selection",
            query: { to: to.id, selected: from.id },
          })
        ),
      onClickTo: () =>
        router.push(
          queryString.stringifyUrl({
            url: "/selection",
            query: { from: from.id, selected: to.id },
          })
        ),
      onSwap: () => {
        router.push(
          "https://github.com/Slipromise/currency-conversion-pretest"
        );
      },
    };
  }, [data, param.slug, router]);

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <h1>Rate Conversion</h1>
        <IoMdClose onClick={router.back} className={styles["close-icon"]} />
      </div>
      {cardProps && <CurrencyConversionCard {...cardProps} />}
    </Container>
  );
}

export default Conversion;
