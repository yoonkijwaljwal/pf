document.addEventListener('DOMContentLoaded', function() {
    // 문의 종류 버튼 처리
    const typeButtons = document.querySelectorAll('.type-btn');
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 다중 선택 가능하도록 다른 버튼들의 선택을 해제하지 않음
            this.classList.toggle('selected');
        });
    });

    // 예산 범위 버튼 처리
    const budgetButtons = document.querySelectorAll('.budget-btn');
    budgetButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 단일 선택만 가능하도록 다른 버튼들의 선택을 해제
            budgetButtons.forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    const contactForm = document.querySelector('.contact-form');
    const popup = document.getElementById('confirmPopup');
    const closePopupBtn = document.querySelector('.close-popup');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 폼 기본 제출 동작 방지
        
        // 여기에 폼 데이터 처리 및 이메일 전송 로직 추가
        
        // 팝업 표시
        popup.style.display = 'flex';
    });

    closePopupBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        contactForm.reset(); // 폼 초기화
    });

    // 이메일 도메인 직접 입력 기능
    const emailSelect = document.querySelector('.email-input-group select');
    const directInput = document.querySelector('.direct-input');
    
    emailSelect.addEventListener('change', function() {
        if(this.value === 'direct') {
            directInput.style.display = 'block';
            directInput.required = true;
        } else {
            directInput.style.display = 'none';
            directInput.required = false;
        }
    });

    // 스크롤 시 헤더 효과
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}); 