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

/** 현재창을 다시 열어서 닫는 작업을 진행
@version 0.0.1 UPDATED 2025-07-31
*/
async function openSelfClose() {
  await new Promise((resolve) => {
    window.open('', '_self');
    resolve();
  }).then(() => {
    window.close();
  });
}
