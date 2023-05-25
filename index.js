let prevBtn, nextBtn, page = 0;
let contactWayElements;
let pages;

const copyFunc = [
    function() {
        copyText("010-9050-4371");
    },
    function() {
        copyText("sjw4371@naver.com");
    },
    function() {
        copyText("https://github.com/ShipFriend0516");
    }
];

window.onload = function() {
    contactWayElements = document.querySelectorAll('.contactWay');
    prevBtn = document.getElementById('prev');
    nextBtn = document.getElementById('next');
    pages = document.getElementsByClassName("page");

    // 각 .contactWay 요소에 클릭 이벤트 핸들러 추가
    
    for (let i = 0; i < 3; i++) {
        contactWayElements[i].addEventListener('click', copyFunc[i]);
    }
    

}

function next() {
    if(page!==2) {
        page++;
    }

    switch(page) {
        case 0:
            pages[0].style.visibility = 'visible';
            pages[1].style.visibility = 'collapse';
        case 1:
            pages[0].style.visibility = 'collapse';
            pages[1].style.visibility = 'visible';
    }
}

function prev() {
    if(page!==0) {
        page--;
    }

    switch(page) {
        case 0:
            pages[0].style.visibility = 'collapse';
            pages[1].style.visibility = 'visible';
        case 1:
            pages[0].style.visibility = 'visible';
            pages[1].style.visibility = 'collapse';
    }
}



function submit() {
    const b1 = document.querySelector(".b1");
    const b2 = document.querySelector(".b2");

    if(b1.value && b1.value!="잘못된 입력입니다.") {
        let url = "https://www.youtube.com/results?search_query=" + b1.value;
        window.open(url);  
    } else {
        b1.value = "잘못된 입력입니다.";
    }
    
}


function copyText(text) {
    navigator.clipboard.writeText(text)
    .then(function() {
        console.log('텍스트가 성공적으로 복사되었습니다.');
        // 여기에 추가적인 동작이 필요한 경우 처리할 수 있습니다.
    })
    .catch(function(error) {
        console.error('텍스트 복사 중에 오류가 발생하였습니다.', error);
        // 여기에 오류 처리를 위한 코드를 작성할 수 있습니다.
    });
}