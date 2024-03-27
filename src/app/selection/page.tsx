"use client";
import CurrencySelectListItem from "@/components/CurrencySelectListItem";
import { usePairsQuery } from "@/store/api";
import React, { ComponentProps, useCallback, useMemo } from "react";
import { Container, ListGroup } from "react-bootstrap";
import styles from "@/styles/selection.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdClose } from "react-icons/io";

type Props = {};

function Selection({}: Props) {
  const searchParams = useSearchParams();

  const { data } = usePairsQuery(
    {},
    {
      selectFromResult: (resp) => ({
        ...resp,
        data: resp.data?.map<
          ComponentProps<typeof CurrencySelectListItem> & {
            id: string;
          }
        >((item) => ({
          id: item.id,
          icon: item.currency_icon,
          title: item.currency,
        })),
      }),
    }
  );

  const fixData = useMemo(
    () =>
      data?.filter(
        ({ title }) =>
          !searchParams.has("to", title) && !searchParams.has("from", title)
      ),
    [data, searchParams]
  );

  const router = useRouter();

  const onClickItem = useCallback(
    (currency: string) => {
      // TODO: 待優化
      // router.back();

      router.replace(
        `/conversion/${
          searchParams.has("from") ? searchParams.get("from") : currency
        }/${searchParams.has("to") ? searchParams.get("to") : currency}`
      );
    },
    [router, searchParams]
  );

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <h1>Currency Select</h1>
        <IoMdClose onClick={router.back} className={styles["close-icon"]} />
      </div>
      <ListGroup>
        {fixData?.map(({ id, ...props }) => (
          <CurrencySelectListItem
            key={id}
            {...props}
            isSelected={searchParams.has("selected", props.title)}
            onClick={() => onClickItem(props.title)}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

export default Selection;
