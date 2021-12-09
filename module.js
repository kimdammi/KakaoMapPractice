const ajaxhelper = (params) => {
    // 최종 params의 데이터 구조
    // params = {
    //     url: "https://dapi.kakao.com/v2/search/' + type + '?query=" + query + "&page=1&size=50';",
    //     method: "GET,POST,PUT,DELETE",
    //     success: function (json){

    //     }
    // }
    const xhr = new XMLHttpRequest();
    xhr.open(params.method || 'GET', params.url);

    // 링크에 숨겨진 data-deptno값을 백엔드에 전송함
    // const url = 'https://dapi.kakao.com/v2/search/' + type + '?query=' + query + '&page=1&size=50';
        xhr.onreadystatechange = (e) => {
        const { target } = e;

        if (target.readyState == XMLHttpRequest.DONE) {
            if (target.status == 200) {
                if(params.success != undefined) {
                    const req = JSON.parse(target.response);
                    console.log(req);
                    params.success(req);
                }
            } else {
                const s = parseInt(target.status / 100);
                let errMsg = null;

                if (s == 4) {
                    errMsg = '[' + target.status + '] ' + target.statusText + ' - 요청 주소가 잘못되었습니다.';
                } else if (s == 5) {
                    errMsg = '[' + target.status + '] ' + target.statusText + ' - 서버의 응답이 없습니다.';
                } else {
                    errMsg = '[' + target.status + '] ' + target.statusText + ' - 요청에 실패했습니다.';
                }

                alert(errMsg);
            }
        }
    };

    xhr.setRequestHeader('Authorization', 'KakaoAK b636ff83df45f778874b079dcb979102');
    xhr.send();
};