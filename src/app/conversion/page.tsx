import CurrencyConversionCard from "@/components/CurrencyConversionCard";
import React from "react";
import { Container } from "react-bootstrap";

type Props = {};

function Conversion({}: Props) {
  return (
    <Container>
      <div>
        <h1>Rate Conversion</h1>
      </div>
      <CurrencyConversionCard
        fromLabel="GHS"
        fromIcon="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/673.jpg"
        toIcon="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/673.jpg"
        toLabel="LKR"
        fromWeight={10000}
        toWeight={5000}
        fromFraction={9}
        toFraction={6}
      />
    </Container>
  );
}

export default Conversion;
