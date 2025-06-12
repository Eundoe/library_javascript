let eventArray = [];

async function debounceEvent(id, event, timer = 500) {
  let new_arr = [...eventArray];
  const idx = new_arr.findIndex((el) => el.id);
  if (idx > -1) {
    clearTimeout(eventArray[idx].run);
    new_arr.splice(idx, 1);
  }
  new_arr.push({
    id: id,
    run: setTimeout(async () => {
      await event();
    }, timer),
  });
  eventArray = new_arr;
}
