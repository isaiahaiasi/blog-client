import React from 'react';
import { formatDistance, parseISO } from 'date-fns';

interface TimestampProps {
  date: string;
}
// TODO: allow Date object as well
function Timestamp({ date }: TimestampProps) {
  const parsedDate = parseISO(date);
  return (
    <span className="text-light">
      {parsedDate && !Number.isNaN(parsedDate.valueOf())
        ? formatDistance(parsedDate, new Date(), {
            addSuffix: true,
          })
        : '???'}
    </span>
  );
}

export default Timestamp;
