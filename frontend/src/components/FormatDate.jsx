import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

export const parseDateValue = (value) => {
  if (!value) return null;
  const parsed = parseISO(value);
  if (!isValid(parsed)) return null;
  return new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()));
};

const FormatDate = ({ dataISO }) => {
  const formatDate = format(parseISO(dataISO), "dd/MM/yyyy", {
    locale: ptBR,
  });

  return <span>{formatDate}</span>;
};

export default FormatDate;
