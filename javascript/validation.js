// 유효성 검사용 함수들

/**국내 핸드폰번호 유효성검사 13자리 11자리 하이픈포함
@param {String | Number} mobile_number 검증하려는 모바일 번호 데이터
@version 0.0.0 UPDATE 2024.02.10
@return {Boolean} True/Flase
@author 조재호 <eundoe92@gmail.com>
*/
function validateMobileKr(mobile_number){
 const mobile_regex_kr_13 = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
 const mobile_regex_kr_11 = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
 if(String(mobile_number).length <= 11){
    return mobile_regex_kr_11.test(String(mobile_number));
 }else if(String(mobile_number).length <=13){
    return mobile_regex_kr_13.test(String(mobile_number));
 }else{
    return false;
 }
}

/**국제 전화번호 유효성 검사 length상관없이 모든 전화번호를 하이픈포함해서 검증
@param {String | Number} phone_number 검증하려는 전화번호 데이터
@version 0.0.0 UPDATE 2024.02.10
@return {Boolean} True/False
@author 조재호 <eundoe92@gmail.com>
*/
function validatePhone(phone_number){
 const phone_regex = /^[0-9][0-9\-]*[0-9]$/;
 return phone_regex.test(String(phone_number));
}


/**국내 한국어 유효성 검사 확인 검증데이터 결과를 전체(all), 단어기준(word), 모음자음기준("char")
 * 로 나눠서 결과를 출력 해당 결과값에서 필요한 내용만 가져다가 사용.
@param {String} korean_char 검증하려는 문자데이터
@param {Boolean} detail 상세데이터를 받는경우 체크
@version 0.0.0 UPDATE 2024.02.10
@return {Boolean}  detail이 False거나 없을경우 출력 True/False
@return {Object}  detail이 True인경우 {all: Boolean, word: Boolean, char: Boolean}
@author 조재호 <eundoe92@gmail.com>
*/
function validateKoreanChar(korean_char, detail){
    const korean_regex_all = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const korean_regex_word = /[가-힣]/;
    const korean_regex_char = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
    if(!detail || detail === false){
        return korean_regex_all.test(korean_char);
    }

    if(detail === true){
        const result = {
            all: korean_regex_all.test(korean_char),
            word: korean_regex_word.test(korean_char),
            char : korean_regex_char.test(korean_char),
        }
        return result;
    }
}


function validateEnglishChar(english_char){
    const english_regex = /[a-zA-Z]/
    return english_char.test(english_regex)
}


/**국제 RFC5322방식 이메일 유효성 체크용 함수 거의 모든 이메일을 통과시키기 때문에 이메일형식 체크용으로사용
 * 특정 이메일 체크를 사용할경우 validateEmailSingle함수를 병용해서 사용해야함
@param {String} email 검증하려는 이메일 데이터
@version 0.0.0 UPDATE 2024.02.10
@return {Boolean} True/False
@author 조재호 <eundoe92@gmail.com>
*/
function validateEmailAll(email){
    const rfc5322_regex =  new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
      );
    return rfc5322_regex.test(String(email))
}

/**엄격한 도메인체크가 필요할경우 추가로 사용해야하는 유효성검사함수 regex형식으로 입력해도 작동하고 그냥 입력해도 작동하기때문에
 * 필요한 도메인체크를 할것
@param {String} email 검증할 이메일 데이터
@param {String} domain 추가로 검증할 도메인 데이터
@version 0.0.0 UPDATE 2024.02.10
@return {Boolean} True/False 도메인이없거나 빈칸일경우 False 반환
@author 조재호 <eundoe92@gmail.com>
*/
function validateEmailSingle(email, domain){
    const domain_regex = new RegExp('[a-zA-Z0-9]+@' + String(domain))
    if(!domain || String(domain).trim().replace(/\s/g,'') === ''){
        return false
    }
    return domain_regex.test(String(email))
}

/**컨텐츠가 빈데이터인지 확인하는 유효성검사 앞뒤공간과 중간공간을 전부 체크해서 
 * 빈칸을 전부 매꾼뒤 체크함 체크한 결과값에 따라 반환
@param {String} contents 유효성 검증 체크할 데이터
@version 0.0.0 UPDATE 2024.02.10
@return {Boolean} True/False 데이터가 없을경우 False 
@author 조재호 <eundoe92@gmail.com>
*/
function validateBlank(contents){
    if(!contents){
        return false
    }
    const progressed_contents = String(contents).trim().replace(/\s/g,'');
    return progressed_contents === '' ?  false : true;
}


/**컨텐츠가 URL 도메읺 형식에 합당한 데이터인지 검증하는 함수
 * 검증시에 http:// https://를 둘다 검증해준다.
@param {String} contents explain about params with type
@version 0.0.0 UPDATE 2024.03.15
@returns {Boolean} True/False
@author 조재호 <eundoe92@gmail.com>
*/
function validateUrlDomain(contents) {
    const domain_check =
      /(http(s)?:\/\/|www.)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}([\/a-z0-9-%#?&=\w])+(\.[a-z0-9]{2,4}(\?[\/a-z0-9-%#?&=\w]+)*)*/gi
    return domain_check.test(contents)
  }