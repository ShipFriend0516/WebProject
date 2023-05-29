let prevBtn, nextBtn, page = 0;
let pages;
let pageBlur;

let contactWayElements;
let logoBtn;
let searchTab;
let description;

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
    description = document.getElementById('description')
    pageBlur = document.getElementsByClassName('pageBlur');
    logoBtn = document.getElementById('logoBtn');
    searchTab = document.getElementById('searchTab');

    pageBlur[0].style.backdropFilter = 'blur(0px)';
    // 각 .contactWay 요소에 클릭 이벤트 핸들러 추가
    
    for (let i = 0; i < 3; i++) {
        contactWayElements[i].addEventListener('click', copyFunc[i]);
    }

    logoBtn.addEventListener('click', showSearchTab);
}

function showSearchTab() {
    if (searchTab.style.visibility === 'visible') {
        searchTab.style.visibility = 'hidden';
    } else {
        searchTab.style.visibility = 'visible';
    }
}

function prev() {
    if(page !== 0) page--;
    marginSet(page);
}

function next() {
    if(page !== 4) page++;
    marginSet(page);
}

function marginSet(page) {
    description.style.marginLeft = 200 + (4400 - 2200*page) +'px';

    for(let i=0;i<pages.length;i++) {
        pageBlur[i].style.backdropFilter = 'blur(3px)';
    }

    pageBlur[page].style.backdropFilter = 'blur(0px)';
}



function searchAndScroll() {
    const searchText = document.getElementById('searchInput').value;
    const content = document.documentElement.innerHTML;
    const regex = new RegExp(searchText, 'gi');
    const matches = content.match(regex);

    if (matches && matches.length > 0) {
        const firstMatch = matches[0];
        const matchElement = document.querySelector(":contains('" + firstMatch + "')");
        if (matchElement) {
            matchElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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