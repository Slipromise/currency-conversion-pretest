import React from "react";
import { Image } from "react-bootstrap";
import styles from "@/styles/currencyRateRow.module.scss";

type Props = {
  icon: string;
  title: string;
  price: number;
  onFocus?: () => void;
  onBlur?: () => void;
};

// TODO: number animation

function CurrencyRateRow({ icon, title, price, onBlur, onFocus }: Props) {
  return (
    <tr
      className={styles.container}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
    >
      <td>
        <Image src={icon} alt="" />
        <span>{title}</span>
      </td>
      <td>
        <span>{price}</span>
      </td>
    </tr>
  );
}

export default CurrencyRateRow;

export const CurrencyRateHeader = () => (
  <tr className={styles.container}>
    <th>Currency</th>
    <th>Price</th>
  </tr>
);
