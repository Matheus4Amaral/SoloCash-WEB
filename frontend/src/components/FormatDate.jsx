import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const FormatDate = ({ dataISO }) => {
  const formatDate = format(parseISO(dataISO), "dd/MM/yyyy", {
    locale: ptBR,
  });

  return <span>{formatDate}</span>;
};

export default FormatDate;
