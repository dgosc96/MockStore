import { useRef, type ReactNode } from 'react';

type IntervalRunnerButtonProps = {
  className?: string;
  children?: ReactNode;
  onPressedDown: () => void;
};

const IntervalRunnerButton = (props: IntervalRunnerButtonProps) => {
  const intervalRef = useRef<number>(0);

  const handleOnMouseDown = () => {
    props.onPressedDown();
    intervalRef.current = setInterval(props.onPressedDown, 100);
  };

  return (
    <button
      onMouseDown={() => handleOnMouseDown()}
      onMouseUp={() => clearInterval(intervalRef.current)}
      onMouseLeave={() => clearInterval(intervalRef.current)}
      className={props.className}
    >
      {props.children}
    </button>
  );
};
export default IntervalRunnerButton;
