//전처리 또는 후처리에 사용되는 함수


/**HTML을 MSWORD로 변환시켜 다운 또는 열람하는 함수 해당기능은 Chrome에서만 작동한다.
 * 사용할때 주의점으론 비동기성 함수를 사용하므로 반드시 그려져있는 대상만을 
 * 변환해서 출력해올수있다. 이때 그려지는 대상을 비시각화 시킴으로서 최소화시키는게 필요하다.
 * HTML에서 MSWORD로 호환할때는 style태그에서는 거의 대부분의 기능이 작용하지 않는다 필요하다면 
 * 해당 태그에서 직접 style attribute를 이용해서 작성해야만 적용된다.
 * 몇몇 html-msword 상호간 적용가능 style property에대한 서술은 하기에 따른다 
 * font-size는 html font-size와 다르게 적용된다(html에 적용된 폰트의 약 -3.5px ~ -4px 정도)
 * font-weight는 bolder만 적용 가능
 * line-height는 percent 타입만 적용가능
 * text-align은 left/center/right만 적용가능
 * 줄바꿈은 <br/>을 사용할것
@param {String} element_id 변환할 부분의 전체를 wrap하고 있는 element의 id
@param {String} file_name 변환하여 다운받을때 
@version 0.0.0 UPDATE 2024.02.10
@author 조재호 <eundoe92@gmail.com>
*/
function convertHTMLtoMSWord(element_id, file_name){
    const new_html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Export HTML To Doc</title>
          <style>
          div{
            font-size:16px;
          }
          </style>
        </head>
        <body>
          ${document.getElementById(String(element_id)).innerHTML}
        </body>
    </html>
    `
    const html_blob = new Blob(['\ufeff',new_html],{type:'application/msword'})
    const encode_url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(new_html)
    const doc_name = String(file_name) + '.doc'
    const download_btn = document.createElement('a')
    document.body.appendChild(download_btn)

    // only use in chrome
    if(navigator.msSaveOrOpenBlob){
        navigator.msSaveOrOpenBlob(html_blob,doc_name)
    }else{
        download_btn.href = encode_url
        download_btn.download = doc_name
        download_btn.click()
    }
    document.body.removeChild(download_btn)
}


/**자릿수 추가하는 함수 받아온 숫자데이터를 가지고 필요한만큼 0을 추가하기위한 함수
 * 앞의 자릿수가 커지면 커질수록 추가되는 데이터는 따로 존재하지 않게됨
@param {String | Number} number 받아오는 숫자데이터 숫자형도 문자형도 전부 문자형으로 변환해서 검증함
@param {Number} digit 자릿수를 얼마로 할것인지 설정하는 부분 오직 숫자만 받아와야함
@version 0.0.0 UPDATE 2024.02.10
@return {String} 자릿수를 가진 데이터 String 값으로 변환 만약 변수가 검증을 통과하지못한다면 기존데이터를 String으로 반환
@author 조재호 <eundoe92@gmail.com>
*/
function convertNumberDigit(number, digit){
    const number_regex = /[0-9]/
    if(number_regex.test(String(number)) && typeof digit === 'number' && digit !== null && digit > 1){
        const number_length = String(number).length
        let new_digit = ''
        for(let index = 0; index < digit - number_length; index++){
            new_digit += '0'
        }
        new_digit += String(number)
        return new_digit
    }else{
        return String(number)
    }
}



  /** UTC타임으로 입력한값을 변경해주는함수 서버와의 통신시 UTC가 필요하면 사용
  @param {String} time 시간 파라메터 YYYY-MM-DD HH:mm:ss등등
  @version 0.0.0 UPDATED 2025-04-04
  @return {String & Number} iso서식으로 반환하는값 , miliseconds방식으로 반환하는 값
  @author 조재호 <eundoe92@gmail.com>
  */
  function cvUtcDate(time) {
    if (!validateBlank(time)) {
      return time
    }
    const localTz = new Date(time)
    const utcTz = Date.UTC(
      localTz.getUTCFullYear(),
      localTz.getUTCMonth(),
      localTz.getUTCDate(),
      localTz.getUTCHours(),
      localTz.getUTCMinutes(),
      localTz.getUTCSeconds(),
    )
  
    const utcResult = `${localTz.getUTCFullYear()}-${String(localTz.getUTCMonth() + 1).padStart(2, '0')}-${String(localTz.getUTCDate()).padStart(2, '0')}T${String(localTz.getUTCHours()).padStart(2, '0')}:${String(localTz.getUTCMinutes()).padStart(2, '0')}:${String(localTz.getUTCSeconds()).padStart(2, '0')}+00:00`
  
    return { iso: utcResult, mil: utcTz }
  }


  /**
 * UTC 시간 데이터를 한국 시간(Asia/Seoul)으로 변환
 * @param {string} dateTime UTC 시간
 * @param {string} localTimezone 로컬시간으로 바꿀 타임존 기본 Asia/Seoul
 * @version 0.0.0 UPDATED 2025-04-04
 * @returns {string} 변환된 한국 시간 문자열
 * @author 조재호 <eundoe92@gmail.com>
 */
function convertUtcToLocale(dateTime,  localTimezone='Asia/Seoul') {
  return new Date(dateTime).toLocaleString('en-US', { timeZone: localTimezone })
}
