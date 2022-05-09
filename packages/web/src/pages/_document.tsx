import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{ height: "100%" }}>
      <style>
        {"#__next { display: flex; flex-direction: column; height: 100% }"}
      </style>
      <Head />
      <body style={{ height: "100%" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
