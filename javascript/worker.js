// worker.js

let timerId = null;

// 메인 스레드로부터 메시지를 수신하는 이벤트 리스너
self.onmessage = function(e) {
  const { type, payload } = e.data;

  if (type === 'START') {
    // 이미 실행 중이라면 중복 실행 방지
    if (timerId) clearTimeout(timerId);
    
    const { url, interval, options } = payload;
    console.log(`[Worker] API 폴링 시작: ${url} (간격: ${interval}ms)`);
    
    // 폴링 함수 실행
    startPolling(url, interval, options);
  } 
  
  else if (type === 'STOP') {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    console.log('[Worker] API 폴링 중지');
  }
};

async function startPolling(url, interval, options) {
  try {
    // 1. API 호출
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 2. 결과 데이터를 메인 스레드로 전송
    self.postMessage({
      type: 'SUCCESS',
      data: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // 에러 발생 시 메인 스레드로 알림
    self.postMessage({
      type: 'ERROR',
      error: error.message
    });
  } finally {
    // 3. 지정된 간격 후 재귀적으로 함수 호출 (setInterval보다 안전함)
    timerId = setTimeout(() => {
      startPolling(url, interval, options);
    }, interval);
  }
}