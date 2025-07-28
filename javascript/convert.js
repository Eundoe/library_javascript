/** 웹주소를 가르키고있는 이미지를 로컬 base64로 전환하여 
 * 해당 이미지를 링크된 데이터로 바라보지 않게 만드는 함수
 * 반드시 비동기처리로 처리해야함
@param {String} elId <img/>태그를 찾아올 대상아이디할당
@version 0.0.1 UPDATED 2025.07.25
@throws {TypeError} Invalid TypeError 출력
@return {반환type} 간단한반환값설명
*/
async function convertWebImageTOBase64(elId) {
  const elType = typeof elId;
  if (elType !== 'string') {
    throw new TypeError(
      `Invalid TypeError ${elId} is ${elType} which is not STRING`
    );
  }
  const targetEl = document.getElementById(elId);
  if (!targetEl) {
    throw new Error(`Invalid Element with ID '${elId}': NOT FOUND.`);
  }
  const docHtml = targetEl.innerHTML;
  const domParser = new DOMParser();
  const instantDOM = domParser.parseFromString(docHtml, 'text/html');
  const domImgs = instantDOM.querySelectorAll('img');
  const imgPromises = [];
  domImgs.forEach((img) => {
    const webSrc = img.getAttribute('src');
    if (webSrc) {
      imgPromises.push(
        fetch(webSrc)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`FetchFailed ${webSrc} : ${res.statusText}`);
            }
            return res.blob();
          })
          .then((fetchedContent) => {
            return new Promise((resolve, reject) => {
              const fileRead = new FileReader();
              fileRead.onloadend = () => {
                img.setAttribute('src', fileRead.result);
                resolve();
              };
              fileRead.onerror = reject;
              fileRead.readAsDataURL(fetchedContent);
            }).catch((err) => {
              console.error(`IMG ERROR : ${src}:`, err);
              resolve();
            });
          })
      );
    }
  });
  await Promise.all(imgPromises);
  return instantDOM;
}

/**  HTML태그를 MSword로 변경시켜서 다운/열람하는 함수 기능 
 * 반드시 그려져있는 대상만을 가져오기 때문에 대상 데이터를 그려서 Append후 
 * 반드시 지워줘야함 여러개를 Append하는 만큼 성능이슈 있을수 있음 주의
@param {String} htmlString
@param {String} fileName 다운/열람시 출력되는 이름
@version 0.0.1 UPDATED 2025.07.25 데이터 변경 및 출력대상 받는 함수로 변경
*/
async function convertHtmlDocTOMsword(htmlString, fileName) {
  const hsType = typeof htmlString;
  const fnType = typeof fileName;
  if (hsType !== 'string') {
    throw new TypeError(
      `Invalid document.innerHTML type ${htmlString}: ${hsType} is not STRING.`
    );
  } else if (fnType !== 'string') {
    throw new TypeError(
      `Invalid FileName type ${fileName}: ${fnType} is not STRING.`
    );
  }

  const ms_html = `
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
          ${htmlString}
        </body>
    </html>
  `;
  const html_blob = new Blob(['\ufeff', ms_html], {
    type: 'application/msword',
  });
  const encode_url =
    'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(ms_html);
  const doc_name = String(fileName) + '.doc';
  const download_btn = document.createElement('a');
  document.body.appendChild(download_btn);

  // only use in chrome
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(html_blob, doc_name);
  } else {
    download_btn.href = encode_url;
    download_btn.download = doc_name;
    download_btn.click();
  }
  document.body.removeChild(download_btn);
}

/**  HTML태그를 MSword로 변경시켜서 다운/열람하는 함수 기능 
 * 반드시 그려져있는 대상만을 가져오기 때문에 대상 데이터를 그려서 Append후 
 * 반드시 지워줘야함 여러개를 Append하는 만큼 성능이슈 있을수 있음 주의
@param {String} htmlString elementInnerHtml한 String값
@param {String} printTitle 프린트/열람시 보이는제목
@version 0.0.1 UPDATED 2025.07.25 
*/
async function convertHtmlDocToPrint(htmlString, printTitle) {
  const hsType = typeof htmlString;
  const ptType = typeof printTitle;
  if (hsType !== 'string') {
    throw new TypeError(
      `Invalid document.innerHTML type ${htmlString}: ${hsType} is not STRING.`
    );
  } else if (ptType !== 'string') {
    throw new TypeError(
      `Invalid FileName type ${printTitle}: ${ptType} is not STRING.`
    );
  }
  const printFrame = document.createElement('iframe');
  printFrame.style.display = 'none';
  document.body.appendChild(printFrame);
  printFrame.contentWindow.document.head.innerHTML = `
        <title>${printTitle}</title>
        <meta charset="utf-8">
        <style>
            body{
                print-color-adjust: exact !important;
            }            
        </style>
  `;
  printFrame.contentWindow.document.body.innerHTML = `      
      <div id="print-area">
          ${htmlString}
      </div>
  `;
  //컨텐츠에 포커싱 및 프린트진행
  printFrame.contentWindow.focus();
  printFrame.contentWindow.print();
  setTimeout(() => {
    document.body.removeChild(printFrame);
  }, 800);
}

/** 전화번호를 마스킹 처리해서 
@param {String} cellPhone 처리할 전화번호
@version 0.0.1 UPDATED 2025.07.28
@return {String} 변환성공시 변환값/실패시 그냥 기존값
*/
function convertCellPhoneMask(cellPhone) {
  const cpType = typeof cellPhone;
  if (cpType !== 'string') {
    throw new TypeError(
      `Invalid variables type ${cellPhone}: ${cpType} is not STRING.`
    );
  }
  const prgs_cell = cellPhone.replace(/\D/g, '');
  if (/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(prgs_cell)) {
    return prgs_cell.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  } else {
    return cellPhone;
  }
}
