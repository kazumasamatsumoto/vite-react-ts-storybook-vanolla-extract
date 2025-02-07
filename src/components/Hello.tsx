// src/components/Hello.tsx
import React from "react";
import { helloStyle } from "./Hello.css";

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = ({ name }) => {
  return <div className={helloStyle}>Hello, {name}!</div>;
};

export default Hello;
