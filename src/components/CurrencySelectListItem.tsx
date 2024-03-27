import React from "react";
import { Image, ListGroup } from "react-bootstrap";
import styles from "@/styles/currencySelectListItem.module.scss";
type Props = {
  icon: string;
  title: string;
  onClick?: () => void;
};

function CurrencySelectListItem({ icon, title, onClick }: Props) {
  return (
    <ListGroup.Item className={styles.container} action onClick={onClick}>
      <Image src={icon} alt="" />
      <span>{title}</span>
    </ListGroup.Item>
  );
}

export default CurrencySelectListItem;
