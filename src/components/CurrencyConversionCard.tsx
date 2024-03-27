"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import { FaAnglesDown } from "react-icons/fa6";
import styles from "@/styles/currencyConversionCard.module.scss";
import numeral from "numeral";

type Props = {
  fromLabel: string;
  fromIcon: string;
  fromWeight: number;
  toLabel: string;
  toIcon: string;
  toWeight: number;
  fromFraction: number;
  toFraction: number;
  onClickFrom?: () => void;
  onClickTo?: () => void;
  onSwap?: (value: number) => void;
};

const CurrencyConversionCard = ({
  fromLabel,
  fromIcon,
  fromWeight,
  toIcon,
  toLabel,
  toWeight,
  fromFraction,
  toFraction,
  onClickFrom,
  onClickTo,
  onSwap,
}: Props) => {
  const [fromValue, setFromValue] = useState(() => 1);

  const [toValue, setToValue] = useState(() => toWeight / fromWeight);

  const onChangeFromValue = useCallback(
    (v: string) => {
      let fixValue = v.split(".");
      if (fixValue[1]) {
        fixValue[1] = fixValue[1].slice(0, fromFraction);
      }
      let num = Number(fixValue.join("."));
      setFromValue(num);
      setToValue((num * toWeight) / fromWeight);
    },
    [fromFraction, fromWeight, toWeight]
  );

  const onChangeToValue = useCallback(
    (v: string) => {
      let fixValue = v.split(".");
      if (fixValue[1]) {
        fixValue[1] = fixValue[1].slice(0, toFraction);
      }
      let num = Number(fixValue.join("."));
      setToValue(num);
      setFromValue((num * fromWeight) / toWeight);
    },
    [fromWeight, toFraction, toWeight]
  );

  const fromFormatter = useMemo(() => {
    let suffixes = new Array<string>(fromFraction);
    suffixes.fill("0");
    return `0.[${suffixes.join("")}]`;
  }, [fromFraction]);

  const toFormatter = useMemo(() => {
    let suffixes = new Array<string>(toFraction);
    suffixes.fill("0");
    return `0.[${suffixes.join("")}]`;
  }, [toFraction]);

  return (
    <Card className={styles.container}>
      <CardHeader>
        <Button variant="outline-primary" onClick={onClickFrom}>
          <Image src={fromIcon} alt="" />
          {fromLabel}
          <FaAngleDown />
        </Button>
        <input
          type="number"
          value={numeral(fromValue).format(fromFormatter, Math.floor)}
          onChange={(e) => onChangeFromValue(e.target.value)}
        />
      </CardHeader>
      <CardBody>
        <Button
          onClick={() => {
            onSwap && onSwap(fromValue);
          }}
        >
          <FaAnglesDown />
        </Button>
        <span>{`1 ${fromLabel} ≈ ${numeral(toWeight / fromWeight).format(
          toFormatter,
          Math.floor
        )} ${toLabel}`}</span>
      </CardBody>
      <CardFooter>
        <Button variant="outline-primary" onClick={onClickTo}>
          <Image src={toIcon} alt="" />
          {toLabel}
          <FaAngleDown />
        </Button>
        <input
          type="number"
          value={numeral(toValue).format(toFormatter, Math.floor)}
          onChange={(e) => onChangeToValue(e.target.value)}
        />
      </CardFooter>
    </Card>
  );
};

export default CurrencyConversionCard;
