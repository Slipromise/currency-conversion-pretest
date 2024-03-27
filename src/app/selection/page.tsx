"use client";
import CurrencySelectListItem from "@/components/CurrencySelectListItem";
import { usePairsQuery } from "@/store/api";
import React, { ComponentProps, useCallback, useMemo } from "react";
import { Container, ListGroup } from "react-bootstrap";
import styles from "@/styles/selection.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { Suspense } from "react";

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
        ({ id }) => !searchParams.has("to", id) && !searchParams.has("from", id)
      ),
    [data, searchParams]
  );

  const router = useRouter();

  const onClickItem = useCallback(
    (id: string) => {
      // TODO: 待優化
      // router.back();

      router.replace(
        `/conversion/${
          searchParams.has("from") ? searchParams.get("from") : id
        }/${searchParams.has("to") ? searchParams.get("to") : id}`
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
            isSelected={searchParams.has("selected", id)}
            onClick={() => onClickItem(id)}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

// TODO: 釐清https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
const WarpedSelection = () => (
  <Suspense>
    <Selection></Selection>
  </Suspense>
);

export default WarpedSelection;
