import React from 'react';

interface ScoreProps {
  percent: number;
}

export default function Score(props: ScoreProps): JSX.Element {
  const { percent } = props;
  const stroke = `${percent}, 100`;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="4"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#CD2E1B"
          strokeWidth="4"
          strokeDasharray={stroke}
        />
      </svg>
    </>
  );
}
