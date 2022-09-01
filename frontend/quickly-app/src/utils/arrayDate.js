export const arrayDate = (from, to) => {
  let newArr = [];
  if (parseInt(from) < parseInt(to)) {
    for (let i = parseInt(from); i < parseInt(to); i++) {
      newArr.push(`${i}:00`, `${i}:30`);
    }
  }
  return newArr;
};
