'use client'

interface ClientTimezoneProps {
  date: string | Date;
}

const ClientTimezoneDate: React.FC<ClientTimezoneProps> = ({ date }) => {
  const convertToUserTimezone = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return <>{convertToUserTimezone(date)}</>;
};

export default ClientTimezoneDate;