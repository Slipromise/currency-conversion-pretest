"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { usePairsQuery } from "@/store/api";

export default function Home() {
  const {} = usePairsQuery({});

  return <main className={styles.main}></main>;
}
