'use client'

interface ClientTimezoneProps {
  date: string | Date;
}

const ClientTimezoneDate: React.FC<ClientTimezoneProps> = ({ date }) => {
  const formatDateAtUserTimezone = (dateString: string | Date): string => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
    const isThisYear = date.getFullYear() === now.getFullYear();

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();

    if (isToday) {
      return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
    }

    if (isYesterday) {
      return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
    }

    if (isThisYear) {
      return `${monthNames[date.getMonth()]} ${day} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
    }

    return `${day} ${date.getFullYear()} ${monthNames[date.getMonth()]} ${day} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
  };

  return <>{formatDateAtUserTimezone(date)}</>;
};

export default ClientTimezoneDate;