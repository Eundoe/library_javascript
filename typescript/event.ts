
let trigger: NodeJS.Timeout = null!;
// 디바운싱
export function debounce(func: () => void, delay: number) {
  clearTimeout(trigger);
  trigger = setTimeout(() => func(), delay);
}
// 디바운싱(페이지병)
export function pageDebounce(
  trg: NodeJS.Timeout,
  func: () => void,
  delay: number,
) {
  clearTimeout(trg);
  return () => setTimeout(() => func(), delay);
}

// 스로틀링
const throttleMap = new Map<string, number>();

export function throttle(key: string, func: () => void, delay: number) {
  const now = Date.now();
  const lastCall = throttleMap.get(key) ?? 0; //처음 호출시간 , 맨 처음 클릭시 0
  console.log(now, lastCall, now - lastCall);
  if (now - lastCall >= delay) {
    console.log('throttle 실행');
    //현재시간에서 마지막호출시간 뺀게 delay 이상이면
    throttleMap.set(key, now);
    func();
  }
}

export function pageThrottle(
  origintime: number,
  func: () => void,
  delay: number,
) {
  const now = Date.now();
  if (now - origintime >= delay) {
    console.log('throttle 실행');
    func();
  }
}



export function searchDateFormat(date:Date, type:"end" | 'start'):string{
  const time = type == "start" ? "00:00:00" : "23:59:59"
  const formed = dayjs(date).format("YYYY-MM-DD")
  return `${formed} ${time}`
}