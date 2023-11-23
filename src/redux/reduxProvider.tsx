import { Provider } from "react-redux";
import { ReactNode } from 'react';
import Store from "./store/store";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={Store}>{children}</Provider>;
}
