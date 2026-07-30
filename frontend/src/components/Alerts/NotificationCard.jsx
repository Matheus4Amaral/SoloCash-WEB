import FormatDate from "../FormatDate.jsx";
import "./styles/NotificationCard.css";

const NotificationCard = ({ title, description, date }) => {
  return (
    <div className="alert-row">
      <h3 className="alert-title" title={title}>{title}</h3>
      <div className="alert-date">
        <FormatDate dataISO={date} />
      </div>
      {description && <p className="alert-description">{description}</p>}
    </div>
  );
};

export default NotificationCard;
