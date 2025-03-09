document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.nav-prev');
    const nextButton = document.querySelector('.nav-next');
    const pageNumbers = document.querySelectorAll('.page-num');
    const showcaseContainer = document.querySelector('.showcase-container');
    
    let currentPage = 1; // 현재 페이지 번호 (기본값 1)
    let isAnimating = false; // 애니메이션 진행 중 여부를 체크하는 플래그
    let autoPlayTimer = null;
    
    function startAutoPlay() {
        // 기존 타이머가 있다면 제거
        if (autoPlayTimer) {
            clearTimeout(autoPlayTimer);
        }
        
        // 새로운 타이머 설정
        autoPlayTimer = setTimeout(() => {
            isAnimating = false;
            if (currentPage < pageNumbers.length) {
                updateActivePage(currentPage + 1);
            } else {
                // 마지막 페이지에서는 1페이지로 돌아가기
                updateActivePage(1);
            }
        }, 5000);
    }
    
    // 현재 활성화된 페이지 표시 함수
    function updateActivePage(pageNum) {
        if (isAnimating) return;
        
        isAnimating = true;
        currentPage = pageNum;
        
        // 페이지 번호 업데이트
        pageNumbers.forEach((num, index) => {
            if (index + 1 === pageNum) {
                num.classList.add('active');
                num.classList.remove('inactive');
                startAutoPlay(); // 타이머 시작
            } else {
                num.classList.add('inactive');
                num.classList.remove('active');
            }
        });
        
        // showcase 슬라이드 업데이트
        const offset = (pageNum - 1) * -100;
        showcaseContainer.style.transform = `translateX(${offset}%)`;
    }
    
    // 이전 버튼 클릭 이벤트
    prevButton.addEventListener('click', () => {
        isAnimating = false;
        if (currentPage > 1) {
            updateActivePage(currentPage - 1);
        } else {
            // 1번에서 이전 버튼 클릭 시 마지막 페이지(7번)로
            updateActivePage(pageNumbers.length);
        }
    });
    
    // 다음 버튼 클릭 이벤트
    nextButton.addEventListener('click', () => {
        isAnimating = false;
        if (currentPage < pageNumbers.length) {
            updateActivePage(currentPage + 1);
        } else {
            // 마지막 페이지에서 다음 버튼 클릭 시 1페이지로
            updateActivePage(1);
        }
    });
    
    // 페이지 번호 클릭 이벤트
    pageNumbers.forEach((num, index) => {
        num.addEventListener('click', () => {
            if (!isAnimating) {
                updateActivePage(index + 1);
            }
        });
    });
    
    // 초기 페이지 설정
    updateActivePage(currentPage);
}); 