import { useState } from "react";

export interface TodoState {
  _id: number, 
  name: string, 
  do: boolean,
}

export const todoComposable = () => {
  const getCheck = (props: TodoState) => {
    return useState(props.do);
  }
  
  return {
    getCheck,
  }
}