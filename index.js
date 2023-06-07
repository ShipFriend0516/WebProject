let prevBtn, nextBtn, page = 0;
let pages;
let pageBlur;

let contactWayElements;
let logoBtn;
let searchTab;
let description;

let canvas, ctx;
let snowflakes = [];
let snowSlider;
let snowAmount;

const descriptions = {
    html: "HTML은 지난 겨울방학 동안 인프런에서 강의를 구매하여 완강하여 완벽하게 이해했습니다. "+
    "시맨틱 태그와 이미지의 alt 태그를 사용해서 사용자에게 불편함이 없는 경험을 제공하기 위해 노력하고 있습니다.",
    css: "CSS는 지난 겨울방학 동안 인프런에서 강의를 구매하여 완강하여 완벽하게 이해했습니다. "+
    "flex 레이아웃과 grid 레이아웃을 학습하였습니다.",
    js: "자바스크립트는 현재 학교에서 배우는 웹프로그래밍과 인프런에서 구매한 자바스크립트 강의를 병행하여 학습 중입니다.",
    py: "파이썬도 가능합니다. 파이썬으로 PyQt나 PyGui등을 이용한 다양한 GUI 프로그래밍을 해본 경험이 있습니다.",
    react: "React는 아직 잘 다루지는 못하지만, 관심을 크게 갖고 학습 계획을 갖고 있는 기술 중 하나입니다. 리액트와 더불어 자바스크립트 프레임워크 중 하나인 Vue.js와 함께 학습할 계획을 세워두었습니다.",
    haechi: "저는 프론트엔드에 가장 큰 관심을 갖고 있지만, 다른 4차 산업혁명 시대의 다른 IT 기술에도 관심을 갖고 있습니다. 해치랩스는 블록체인을 활용하는 회사로,"+
    " 탈중앙화라는 특성을 살리고, 사용자와 블록체인 네트워크 간의 실시간 상호작용을 돕는 것에 대한 흥미가 있어 관심을 갖고 있는 기업입니다.",
    naver: "네이버에도 관심이 많습니다. 네이버는 대한민국의 IT 업계를 이끌어나가는 플랫폼 중 하나라고 생각하고, 이 곳의 일원이 된다면 정말 많은 일들을 할 수 있을 것 같다는 생각에 관심을 갖게 되었습니다.",
    bigpicture: "빅픽쳐인터랙티브 회사는 효율적인 업무환경을 위한 여러가지 툴 사용 및 이번 학기 소프트웨어공학에서 배운 애자일 개발 방법론이나 스프린트, 데일리 스크럼 등의 방법을 직접 활용하는 회사로 관심이 갔습니다. 그리고 이 회사는 E-스포츠에 관련한 서비스를 개발하는 회사이기도 해서 관심이 가는 기업입니다.",
    socar: "쏘카 기업은 리액트나 vue.js 같은 새로운 기술을 적극적으로 활용하는 것 같아 관심이 가는 기업 중 하나입니다.",
};

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
    searchTab = document.querySelectorAll('.searchTab');

    canvas = document.getElementById('introCanvas');
    ctx = canvas.getContext('2d');
    
    
    setup();
    updateTime();
    pageBlur[0].style.backdropFilter = 'blur(0px)';
    // 각 .contactWay 요소에 클릭 이벤트 핸들러 추가
    
    for (let i = 0; i < 3; i++) {
        contactWayElements[i].addEventListener('click', copyFunc[i]);
        contactWayElements[i].addEventListener('click', () => showToast("클립보드에 복사되었습니다."));
    }

    let isSearchTabVisible = false;

    logoBtn.addEventListener('click', function() {
        searchTab.forEach(tab => {
            if (isSearchTabVisible) {
                tab.style.display = 'none';
            } else {
                tab.style.display = 'block';
            }
        });

        isSearchTabVisible = !isSearchTabVisible;
    });
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
    if (page !== 0) {
        page--;
        marginSet(page);
    } else {
        animateShakeEffect('prev');
    }
}

function next() {
    if (page !== 5) {
        page++;
        marginSet(page);
    } else {
        animateShakeEffect('next');
    }
}

function animateShakeEffect(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.add('shake-animation');

    setTimeout(() => {
        button.classList.remove('shake-animation');
    }, 1000);
}

function marginSet(page) {
    description.style.marginLeft = 200 + (5500 - 2200*page) +'px';

    for(let i=0;i<pages.length;i++) {
        pageBlur[i].style.backdropFilter = 'blur(3px)';
    }

    pageBlur[page].style.backdropFilter = 'blur(0px)';
}

/////////////////////////

// 기술 클릭 이벤트 //

function toggleDescription(id) {
    const image = document.getElementById(id);
    const toImage = document.getElementById('DescImage');
    toImage.src = image.src;
    const description = document.getElementById('DescText');
    description.innerHTML = descriptions[id];

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
    
    const snowSlider = document.getElementById('snowSlider'); // 슬라이더 요소를 가져옵니다
    snowAmount = snowSlider.value;
    snowSlider.addEventListener('input', function() {
        snowAmount = snowSlider.value; // 슬라이더 값으로 snowAmount를 조정합니다
        snowflakes= [];

        if(snowAmount > snowSlider.max)
        resizeCanvas(); // 눈의 양이 변경되었으므로 캔버스 크기를 다시 조정합니다
        createSnowflakes(snowAmount); // 변경된 눈의 양에 따라 눈을 생성합니다
    });
    
    resizeCanvas();
    createSnowflakes(snowAmount);
    requestAnimationFrame(update);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createSnowflakes(num) {
    let maxWind = 3;
    let minWind = 1;

    for (let i = 0; i < num; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 2;
        const speedY = Math.random() * 0.5 + 1.5;
        const windSpeed = Math.random() * maxWind + minWind;
        snowflakes.push({ x, y, size, speedY, windSpeed });
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
        snowflake.y += snowflake.speedY;
        snowflake.x += snowflake.windSpeed; // 바람의 속도를 x 좌표에 적용합니다
        
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        
        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
        }
        if (snowflake.x > canvas.width) {
            snowflake.x = 0;
        }
    });

    requestAnimationFrame(update);
}

// 컨택트 복사 함수 //

function copyText(text) {
    navigator.clipboard.writeText(text)
    .then(function() {
        console.log('텍스트가 성공적으로 복사되었습니다.');
    })
    .catch(function(error) {
        console.error('텍스트 복사 중에 오류가 발생하였습니다.', error);
    });
}

////////////////////////////

// 토스트메시지 //

function showToast(message) {
    const toastContainer = document.createElement('div');
    toastContainer.classList.add('toast');
    toastContainer.innerText = message;

    document.body.appendChild(toastContainer);

    toastContainer.style.opacity = 1;
    toastContainer.style.visibility = 'visible';

    setTimeout(() => {
        toastContainer.style.opacity = 0;
        toastContainer.style.visibility = 'hidden';
        toastContainer.remove();
    }, 2000);
}
