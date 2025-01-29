import PropTypes from 'prop-types';
import { eachMinuteOfInterval } from 'date-fns';

CalendarEvent.propTypes = {
  eventData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    startTime: PropTypes.instanceOf(Date).isRequired,
    endTime: PropTypes.instanceOf(Date).isRequired,
    subtitle: PropTypes.string,
    classNames: PropTypes.object,
  }),
};

export default function CalendarEvent({ eventData }) {
  let todayMorning = new Date();
  todayMorning.setHours(7);
  const durationInMinutes =
    eachMinuteOfInterval({ start: eventData.startTime, end: eventData.endTime })
      .length - 1;
  const durationInHours = durationInMinutes / 60;
  const topDiff = eventData.startTime.getHours() - todayMorning.getHours();
  const heightCalculation = durationInHours * 50 - 5;
  const eventContainerStyles = {
    position: 'absolute',
    top: `${topDiff * 50}px`,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: `${heightCalculation}px`,
    marginRight: '5px',
    padding: '5px',
    boxSizing: 'border-box',
    border: 'solid',
    borderWidth: '0px 0px 0px 2px',
    borderRadius: '3px',
    cursor: 'pointer',
    ...eventData.classNames,
  };
  const eventTextStyles = {
    fontSize: '11px',
    fontWeight: '500',
  };
  const getTimeString = (dateObj) =>
    dateObj.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

  return (
    <div style={eventContainerStyles}>
      <p style={eventTextStyles}>{eventData.title}</p>
      {heightCalculation > 20 && (
        <p style={{ ...eventTextStyles }}>
          {getTimeString(eventData.startTime)} -{' '}
          {getTimeString(eventData.endTime)}
        </p>
      )}
      {heightCalculation > 40 && (
        <p style={eventTextStyles}>{eventData.subtitle}</p>
      )}
    </div>
  );
}
