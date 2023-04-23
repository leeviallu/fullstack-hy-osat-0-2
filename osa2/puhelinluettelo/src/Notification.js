import './Notification.css';

const Notification = ({ message, positive }) => {
    if (message === null) {
      return null
    }

    const computedClassName = positive ? 'positive' : 'negative';
  
    return (
      <div className={computedClassName}>
        {message}
      </div>
    )
  }

  export default Notification;