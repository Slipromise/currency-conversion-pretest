"use client";
import Image from "next/image";
import styles from "@/styles/home.module.scss";
import { usePairsQuery } from "@/store/api";
import { Button, Container, Stack, Table } from "react-bootstrap";
import CurrencyRateRow, {
  CurrencyRateHeader,
} from "@/components/CurrencyRateRow";
import { ComponentProps, useCallback, useState } from "react";

export default function Home() {
  const [selectID, setSelectID] = useState(() => "");

  const { data } = usePairsQuery(
    {},
    {
      selectFromResult: (resp) => ({
        ...resp,
        data:
          resp.data?.map(
            (item) =>
              ({
                icon: item.currency_icon,
                title: `${item.currency}/TWD`,
                price: item.twd_price,
                id: item.id,
              } as ComponentProps<typeof CurrencyRateRow> & { id: string })
          ) || [],
      }),
    }
  );

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <h1>Rate Table(TWD)</h1>
      </div>
      <div className={styles.body}>
        <Table striped hover>
          <thead>
            <CurrencyRateHeader />
          </thead>
          <tbody>
            {data.map(({ id, ...props }) => (
              <CurrencyRateRow
                key={id}
                {...props}
                onBlur={() => setSelectID((pre) => (pre === id ? "" : pre))}
                onFocus={() => setSelectID(id)}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <div className={styles.footer}>
        <Button disabled={!selectID}>Rate Conversion</Button>
        {/* TODO: Link */}
      </div>
    </Container>
  );
}
