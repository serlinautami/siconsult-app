export const getChatTime = date => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = oldDate => {
  const year = oldDate.getFullYear();
  const month = oldDate.getMonth() + 1;
  const date = oldDate.getDate();

  return `${year}-${month}-${date}`;
};

export const convertDateToMomentFormat = date => {
  date = date.split('-');

  const year = date[0];
  const month = date[1] && date[1].length === 1 ? `0${date[1]}` : date[1];
  const day = date[2] && date[2].length === 1 ? `0${date[2]}` : date[2];

  return `${year}-${month}-${day}`;
};
