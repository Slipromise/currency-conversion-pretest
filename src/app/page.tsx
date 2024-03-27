"use client";
import Image from "next/image";
import styles from "@/styles/home.module.scss";
import { usePairsQuery } from "@/store/api";
import { Button, Container, Table } from "react-bootstrap";
import CurrencyRateRow, {
  CurrencyRateHeader,
} from "@/components/CurrencyRateRow";
import { ComponentProps, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectCurrencies, setSelectCurrencies] = useState<string[]>(() => []);

  const { data } = usePairsQuery(
    {},
    {
      selectFromResult: (resp) => ({
        ...resp,
        data:
          resp.data?.map<
            ComponentProps<typeof CurrencyRateRow> & {
              id: string;
              currency: string;
            }
          >((item) => ({
            icon: item.currency_icon,
            title: `${item.currency}/TWD`,
            price: item.twd_price,
            id: item.id,
            currency: item.currency,
          })) || [],
      }),
    }
  );

  const router = useRouter();
  const onRowClick = useCallback((currency: string) => {
    setSelectCurrencies((pre) => {
      if (pre.includes(currency)) {
        return pre;
      } else if (pre.length < 2) {
        return [...pre, currency];
      } else {
        return [pre[1], currency];
      }
    });
  }, []);

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <h1>Rate Table(TWD)</h1>
      </div>
      <div className={styles.body}>
        <Table striped>
          <thead>
            <CurrencyRateHeader />
          </thead>
          <tbody>
            {data.map(({ id, currency, ...props }) => (
              <CurrencyRateRow
                key={id}
                {...props}
                onClick={() => onRowClick(currency)}
                isSelected={selectCurrencies.includes(currency)}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <div className={styles.footer}>
        <Button
          disabled={selectCurrencies.length < 2}
          onClick={() =>
            router.push(`/conversion/${selectCurrencies.join("/")}`)
          }
        >
          Rate Conversion
        </Button>
      </div>
    </Container>
  );
}
