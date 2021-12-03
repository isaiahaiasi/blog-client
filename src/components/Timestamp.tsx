import React from 'react';
import { formatDistance, parseISO } from 'date-fns';

interface TimestampProps {
  date: string;
}
// TODO: allow Date object as well
const Timestamp = ({ date }: TimestampProps) => {
  const parsedDate = parseISO(date);
  return (
    <div>
      {parsedDate && !Number.isNaN(parsedDate.valueOf())
        ? formatDistance(parsedDate, new Date(), {
            addSuffix: true,
          })
        : '???'}
    </div>
  );
};

export default Timestamp;
