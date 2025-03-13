document.addEventListener('DOMContentLoaded', function() {
    // Contact 섹션 스크롤 처리
    const contactHeader = document.querySelector('.fixed-contact-header');
    const contactSection = document.getElementById('contact-section');
    const contactArrow = document.querySelector('.contact-arrow');

    // 화살표 클릭 이벤트
    contactArrow.addEventListener('click', function() {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });

    // EmailJS 초기화
    emailjs.init("pBRc__zcijYYKncLv"); // EmailJS 퍼블릭 키

    // 이메일 도메인 직접 입력 처리
    const emailSelect = document.querySelector('.email-select');
    const directInput = document.querySelector('.direct-input');
    
    if (emailSelect) {
        emailSelect.addEventListener('change', function() {
            if (this.value === 'direct') {
                directInput.style.display = 'block';
            } else {
                directInput.style.display = 'none';
            }
        });
    }
    
    // 문의 종류 버튼 처리
    const typeButtons = document.querySelectorAll('.type-btn');
    const selectedType = document.getElementById('selected_type');
    
    if (typeButtons.length > 0 && selectedType) {
        typeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 현재 버튼의 active 상태를 토글
                this.classList.toggle('active');
            });
        });
    }
    
    // 예산 범위 버튼 처리
    const budgetButtons = document.querySelectorAll('.budget-btn');
    const selectedBudget = document.getElementById('selected_budget');
    
    if (budgetButtons.length > 0 && selectedBudget) {
        budgetButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 이전에 선택된 버튼의 스타일 제거
                budgetButtons.forEach(btn => btn.classList.remove('active'));
                // 현재 버튼 활성화
                this.classList.add('active');
                // hidden 필드에 값 설정
                selectedBudget.value = this.getAttribute('data-value');
            });
        });
    }
    
    // 팝업 닫기 버튼
    const closePopupBtn = document.querySelector('.close-popup');
    const confirmPopup = document.getElementById('confirmPopup');
    
    if (closePopupBtn && confirmPopup) {
        closePopupBtn.addEventListener('click', function() {
            confirmPopup.style.display = 'none';
        });
    }
    
    // 폼 제출 처리
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // 기본 제출 동작 방지
            
            const emailId = document.querySelector('input[name="email_id"]').value;
            let emailDomain;
            
            if (emailSelect.value === 'direct') {
                emailDomain = directInput.value;
            } else {
                emailDomain = emailSelect.value;
            }
            
            // 완성된 이메일 주소 설정
            const completeEmail = document.getElementById('complete_email');
            completeEmail.value = emailId + '@' + emailDomain;
            
            // 이메일 유효성 검사
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(completeEmail.value)) {
                alert('유효한 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 필수 선택 항목 확인
            if (!selectedType.value) {
                alert('문의 종류를 선택해주세요.');
                return;
            }
            
            if (!selectedBudget.value) {
                alert('예산 범위를 선택해주세요.');
                return;
            }
            
            // 제출 버튼 비활성화 (중복 제출 방지)
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '전송 중...';
            }
            
            // EmailJS로 폼 데이터 전송
            // 템플릿 파라미터에 맞게 데이터 객체 생성
            const templateParams = {
                from_name: document.querySelector('input[name="name"]').value,
                user_email: completeEmail.value,
                user_phone: document.querySelector('input[name="phone"]').value || '전화번호 없음',
                inquiry_type: selectedType.value,
                budget_range: selectedBudget.value,
                schedule: document.querySelector('input[name="schedule"]').value,
                subject: document.querySelector('input[name="subject"]').value,
                user_message: document.querySelector('textarea[name="message"]').value
            };
            
            console.log('Sending email with params:', templateParams);
            
            // EmailJS 전송
            emailjs.send('service_wg6ipkb', 'template_erxsm0l', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // 제출 버튼 상태 복원
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = '문의하기';
                    }
                    
                    // 폼 초기화
                    form.reset();
                    
                    // 버튼 선택 상태 초기화
                    typeButtons.forEach(btn => btn.classList.remove('active'));
                    budgetButtons.forEach(btn => btn.classList.remove('active'));
                    selectedType.value = '';
                    selectedBudget.value = '';
                    
                    // 직접 입력 필드 숨기기
                    directInput.style.display = 'none';
                    
                    // 커스텀 팝업 표시
                    confirmPopup.style.display = 'block';
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    
                    // 제출 버튼 상태 복원
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = '문의하기';
                    }
                    
                    alert('문의 전송 중 오류가 발생했습니다: ' + JSON.stringify(error));
                });
        });
    }
});

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading');
    loadingScreen.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500); // 애니메이션 시간과 일치시킵니다.
}); 