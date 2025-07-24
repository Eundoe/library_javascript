// Validation 목적의 유틸 함수모음 실패시 유효성에 부합하지않을시 False반환 부합할시 True반환(고정)

/**컨텐츠가 빈데이터인지 확인하는 유효성검사 앞뒤공간과 중간공간을 전부 체크해서 
 * 빈칸을 전부 매꾼뒤 체크함 체크한 결과값에 따라 반환
@param {String | Number} v 유효성 검증 체크할 데이터
@version 0.0.1 UPDATE 2025.07.24 변수값일관화 데이터 검증 가능여부 확인필요
@return {Boolean} True(값없음)/False(값있음)
@author 조재호 <eundoe92@gmail.com>
*/
function validEmpty(v) {
  if (typeof v !== 'string' && typeof v !== 'number') {
    return false;
  }
  return String(v).replace(/\s/g, '') === '';
}

/** 컨텐츠에 이모지가 포함되어있는지 확인 
  @param {String} v 체크할 단어 문장 또는 항목
  @version 0.0.1 2025-07-24 함수명 변경획일화
  @return {Boolean} True(이모지포함)/False(이모지미포함/타입이안맞음)
  @author 조재호 <eundoe92@gmail.com>
  */
function validEmoji(v) {
  if (typeof v != 'string') {
    return false;
  }
  return /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/.test(
    v
  );
}

/** 디바이스 체크용 함수
@version 0.0.1 UPDATED 2025-07-24 함수명 변경 획일화
@return {Boolean} True(모바일)/False(데스크탑)
@author 조재호 <eundoe92@gmail.com>
*/
function validMobile() {
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
    navigator.userAgent
  );
}

/**대한민국기준 국내핸드폰번호 유효성검사
@param {String} v 검증하려는 휴대번호 데이터
@version 0.0.1 UPDATE 2025.07.24 함수명변경
@return {Boolean} True(포맷에맞음)/False(포맷X|타입안맞음)
@author 조재호 <eundoe92@gmail.com>
*/
function validCellPhoneDom(v) {
  if (typeof v != 'string') {
    return false;
  }
  return /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(v);
}

/**컨텐츠가 URL 도메읺 형식에 합당한 데이터인지 검증하는 함수
 * 검증시에 http:// https://를 둘다 검증해준다.
@param {String} v 검증할 도메인값
@version 0.0.1 UPDATE 2025.07.24 함수명 변경 검증 추가
@returns {Boolean} True(Url O)/False(Url X/타입다름)
@author 조재호 <eundoe92@gmail.com>
*/
function validWebUrl(v) {
  if (typeof v !== 'string') {
    return false;
  }
  return /(http(s)?:\/\/|www.)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}([\/a-z0-9-%#?&=\w])+(\.[a-z0-9]{2,4}(\?[\/a-z0-9-%#?&=\w]+)*)*/gi.test(
    v
  );
}

/** 이메일 유효성 검증 함수
@param {String} v 검증할 이메일값
@param {String[]} domains 검증할 도메인 Array로 추가
@param {Boolean} strict rfc5322체크 기본값 false
@version 0.0.1 UPDATED 2025.07.24 
@return {Boolean} True(도메인통과)/False(도메인실패)
*/

function validEmail(v, domains = [], strict = false) {
  if (typeof v !== 'string' || !Array.isArray(domains)) {
    return false;
  }
  const defaultMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const rfc5322 = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!defaultMail.test(v)) {
    return false;
  }
  if (strict && !rfc5322.test(v)) {
    return false;
  }
  if (domains.length > 0) {
    const domainPart = v.split('@')[1].toLowerCase();
    for (let i = 0; i < domains.length; i++) {
      if (typeof domains[i] !== 'string') {
        continue;
      }
      const cleanDomain = domains[i].replace('@', '').toLowerCase();
      if (domainPart === cleanDomain) {
        return true;
      }
    }
    return false;
  } else {
    return true;
  }
}

/** 두 값의 데이터 비교
@param {String|Number|Boolean|BigInt} vi 값1
@param {String|Number|Boolean|BigInt} vii 값2
@version 0.0.1 UPDATED 2025.07.24
@return {Boolean} True(두값과 타입이 일치)/False(값또는 타입이 일치안함)
*/
function validEqualValue(vi, vii) {
  const VALID_TYPE_LIST = ['string', 'number', 'boolean', 'bigint'];
  const viType = typeof vi;

  if (viType !== typeof vii || !VALID_TYPE_LIST.includes(viType)) {
    return false;
  }
  if (Number.isNaN(vi) || Number.isNaN(vii)) {
    return false;
  }
  return vi === vii;
}

/** Object객체/Array객체 간 값 비교 하는 함수
@param {Object} vi 값1
@param {Object} vii 값2
@requires validEqualValue 함수가 반드시 필요사용시에는 같이 쓸것
@version 0.0.1 UPDATED 2025.07.24
@return {Boolean} True(두값과 타입이 일치)/False(값또는 타입이 일치안함)
*/
function validEqualObject(vi, vii) {
  //Type check
  const viType = typeof vi;
  if (viType !== typeof vii || viType !== 'object') {
    return false;
  }

  //Null check
  if (vi === null && vii === null) {
    return true;
  } else if (vi === null || vii === null) {
    return false;
  }

  //Arr check
  const viArrCheck = Array.isArray(vi);
  const viiArrCheck = Array.isArray(vii);

  if (viArrCheck && viiArrCheck) {
    // both Array
    if (vi.length !== vii.length) {
      return false;
    }
    for (let i = 0; i < vi.length; i++) {
      const viItemType = typeof vi[i];
      const viiItemType = typeof vii[i];
      if (viItemType !== viiItemType) {
        return false;
      } else if (viItemType === 'object') {
        if (!validEqualObject(vi[i], vii[i])) {
          return false;
        }
      } else {
        if (!validEqualValue(vi[i], vii[i])) {
          return false;
        }
      }
    }
  } else if (!viArrCheck && !viiArrCheck) {
    // both Object
    const viKeys = Object.keys(vi);
    const viiKeys = Object.keys(vii);
    if (viKeys.length !== viiKeys.length) {
      return false;
    }
    for (let key of viKeys) {
      if (!Object.prototype.hasOwnProperty.call(vii, key)) {
        return false;
      }
      const viItemType = typeof vi[key];
      const viiItemType = typeof vii[key];
      if (viItemType !== viiItemType) {
        return false;
      } else if (viItemType === 'object') {
        if (!validEqualObject(vi[key], vii[key])) {
          return false;
        }
      } else {
        if (!validEqualValue(vi[key], vii[key])) {
          return false;
        }
      }
    }
    return true;
  } else {
    return false;
  }
}
