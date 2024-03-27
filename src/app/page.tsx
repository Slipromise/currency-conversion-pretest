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
  const [selectIDs, setIDs] = useState<string[]>(() => []);

  const { data } = usePairsQuery(
    {},
    {
      selectFromResult: (resp) => ({
        ...resp,
        data:
          resp.data?.map<
            ComponentProps<typeof CurrencyRateRow> & {
              id: string;
            }
          >((item) => ({
            icon: item.currency_icon,
            title: `${item.currency}/TWD`,
            price: item.twd_price,
            id: item.id,
          })) || [],
      }),
    }
  );

  const router = useRouter();
  const onRowClick = useCallback((id: string) => {
    setIDs((pre) => {
      if (pre.includes(id)) {
        return pre;
      } else if (pre.length < 2) {
        return [...pre, id];
      } else {
        return [pre[1], id];
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
            {data.map(({ id, ...props }) => (
              <CurrencyRateRow
                key={id}
                {...props}
                onClick={() => onRowClick(id)}
                isSelected={selectIDs.includes(id)}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <div className={styles.footer}>
        <Button
          disabled={selectIDs.length < 2}
          onClick={() => router.push(`/conversion/${selectIDs.join("/")}`)}
        >
          Rate Conversion
        </Button>
      </div>
    </Container>
  );
}
