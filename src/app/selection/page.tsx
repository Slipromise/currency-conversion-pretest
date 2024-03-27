"use client";
import CurrencySelectListItem from "@/components/CurrencySelectListItem";
import { usePairsQuery } from "@/store/api";
import React, { ComponentProps } from "react";
import { Container, ListGroup } from "react-bootstrap";
import styles from "@/styles/selection.module.scss";

type Props = {};

function Selection({}: Props) {
  const { data } = usePairsQuery(
    {},
    {
      selectFromResult: (resp) => ({
        ...resp,
        data: resp.data?.map(
          (item) =>
            ({
              id: item.id,
              icon: item.currency_icon,
              title: item.currency,
            } as ComponentProps<typeof CurrencySelectListItem> & {
              id: string;
            })
        ),
      }),
    }
  );

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <h1>Currency Select</h1>
      </div>
      <ListGroup>
        {data?.map(({ id, ...props }) => (
          <CurrencySelectListItem
            key={id}
            {...props}
            onClick={() => {
              // console.log("click");
              // TODO: Link
            }}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

export default Selection;
