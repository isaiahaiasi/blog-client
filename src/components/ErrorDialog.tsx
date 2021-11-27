import React from 'react';

interface ErrorProps {
  message: string;
}

export default function ErrorDialog({ message }: ErrorProps) {
  return <div>{message}</div>;
}
