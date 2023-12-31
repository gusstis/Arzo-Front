import { DateTime } from 'luxon';

function DateFormatter({ dateString }) {
  const date = DateTime.fromISO(dateString);
  const formattedDate = date.toLocaleString({
    locale: 'es-ES',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <span>{formattedDate}</span>;
}

export default DateFormatter;