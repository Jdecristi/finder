import { useState } from "react";

import type { FC, PropsWithChildren } from "react";

type CounterProps = {
  count: number;
};

const Counter: FC<PropsWithChildren<CounterProps>> = ({ children, count: initialCount }) => {
  const [count, setCount] = useState(initialCount);
  const add = () => setCount((i) => i + 1);
  const subtract = () => setCount((i) => i - 1);

  return (
    <>
      <div className="font-lg mt-8 flex place-items-center items-center justify-center gap-x-12">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <div className="text-center">{children}</div>
    </>
  );
};

export { Counter };
export type { CounterProps };
