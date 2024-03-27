import React from "react";
import { Image, ListGroup } from "react-bootstrap";
import styles from "@/styles/currencySelectListItem.module.scss";
type Props = {
  icon: string;
  title: string;
  onClick?: () => void;
  isSelected?: boolean;
};

function CurrencySelectListItem({ icon, title, onClick, isSelected }: Props) {
  return (
    <ListGroup.Item
      className={styles.container}
      action
      onClick={onClick}
      data-is-selected={isSelected}
    >
      <Image src={icon} alt="" />
      <span>{title}</span>
    </ListGroup.Item>
  );
}

export default CurrencySelectListItem;
