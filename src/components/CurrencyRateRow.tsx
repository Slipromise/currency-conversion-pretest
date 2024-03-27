import React from "react";
import { Image } from "react-bootstrap";
import styles from "@/styles/currencyRateRow.module.scss";

type Props = {
  icon: string;
  title: string;
  price: number;
  onClick?: () => void;
  isSelected?: boolean;
};

// TODO: number animation

function CurrencyRateRow({ icon, title, price, onClick, isSelected }: Props) {
  return (
    <tr
      className={styles.container}
      onClick={onClick}
      data-is-selected={isSelected}
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
