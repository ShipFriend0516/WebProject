let prevBtn, nextBtn, page = 0;
let pages;
let pageBlur;

let contactWayElements;
let logoBtn;
let searchTab;
let description;

let canvas, ctx;
let snowflakes = [];

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

    canvas = document.getElementById('introCanvas');
    ctx = canvas.getContext('2d');

    setup();
    updateTime();
    pageBlur[0].style.backdropFilter = 'blur(0px)';
    // 각 .contactWay 요소에 클릭 이벤트 핸들러 추가
    
    for (let i = 0; i < 3; i++) {
        contactWayElements[i].addEventListener('click', copyFunc[i]);
    }

    logoBtn.addEventListener('click', showSearchTab);
}

function updateTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();

    // 24시간 형식으로 시간을 표시하기 위해 조건문을 사용합니다.
    let amPm = hours >= 12 ? '오후' : '오전';

    // 12시간 형식으로 변환합니다.
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시일 경우 12로 변경합니다.

    // 시간, 분, 초가 한 자리 수일 경우 앞에 0을 추가합니다.
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    let timeString = `${amPm} ${hours}시 ${minutes}분`;

    // 시간을 표시할 HTML 요소를 선택하여 갱신합니다.
    timeNowElement = document.getElementById('timeNow');
    timeNowElement.textContent = timeString;
}

  // 1초마다 updateTime 함수를 호출하여 시간을 갱신합니다.
setInterval(updateTime, 60000);

function showSearchTab() {
    if (searchTab.style.visibility === 'visible') {
        searchTab.style.visibility = 'hidden';
    } else {
        searchTab.style.visibility = 'visible';
    }
}

// aboutMe 섹션 버튼 이벤트

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

////////////////////////////

// 컨택트 복사 함수 //

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

////////////////////////////

// canvas 이벤트

function setup() {
    canvas = document.getElementById('introCanvas');
    if (!canvas) {
        console.error("canvas를 찾을 수 없습니다.");
        return;
    }
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    createSnowflakes(100);
    requestAnimationFrame(update);
}

window.addEventListener('resize', function() {
    resizeCanvas();
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createSnowflakes(num) {
    for (let i = 0; i < num; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 2;
        const speedY = Math.random() * 0.5+ 1.5;
        
        snowflakes.push({ x, y, size, speedY });
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
    snowflake.y += snowflake.speedY;
    
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    if (snowflake.y > canvas.height) {
        snowflake.y = 0;
    }
    });

    requestAnimationFrame(update);
}


