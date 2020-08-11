import { React, PropTypes } from '@libraries';
import IsMe from './IsMe';
import Other from './Other';

const ChatItem = ({ name, isMe, text, date, photo, simple }) => {
  if (isMe) {
    return <IsMe name={name} text={text} date={date} simple={simple} />;
  }
  return (
    <Other name={name} text={text} date={date} photo={photo} simple={simple} />
  );
};

ChatItem.propTypes = {
  isMe: PropTypes.bool,
  text: PropTypes.string,
  date: PropTypes.string,
  photo: PropTypes.any,
  simple: PropTypes.bool,
  name: PropTypes.string
};

ChatItem.defaultProps = {
  isMe: false,
  text: '',
  date: '',
  photo: null,
  name: '',
  simple: false
};

export default React.memo(ChatItem);
