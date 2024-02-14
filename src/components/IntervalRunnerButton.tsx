import { useRef, type ReactNode } from 'react';

type IntervalRunnerButtonProps = {
  className?: string;
  children?: ReactNode;
  onPressedDown: () => void;
  onStop?: () => void;
};

const IntervalRunnerButton = (props: IntervalRunnerButtonProps) => {
  const intervalRef = useRef<string | number | NodeJS.Timeout | undefined>();

  const handleOnMouseDown = () => {
    props.onPressedDown();
    intervalRef.current = setInterval(props.onPressedDown, 100);
  };

  const handleOnStop = () => {
    if (!intervalRef.current) return;

    if (props.onStop) props.onStop();
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  return (
    <button
      onMouseDown={() => handleOnMouseDown()}
      onMouseUp={() => handleOnStop()}
      onMouseLeave={() => handleOnStop()}
      className={props.className}
    >
      {props.children}
    </button>
  );
};
export default IntervalRunnerButton;
