document.addEventListener('DOMContentLoaded', function() {
    const contactHeader = document.querySelector('.fixed-contact-header');
    const contactSection = document.getElementById('contact-section');
    const contactArrow = document.querySelector('.contact-arrow');

    window.addEventListener('scroll', function() {
        const contactSectionRect = contactSection.getBoundingClientRect();
        
        // contact 섹션이 화면에 보이기 시작하면
        if (contactSectionRect.top <= window.innerHeight) {
            contactHeader.style.position = 'absolute';
            contactHeader.style.bottom = 'auto';
            contactHeader.style.top = (contactSectionRect.top + window.pageYOffset - 60) + 'px'; // 헤더 높이만큼 조정
        } else {
            contactHeader.style.position = 'fixed';
            contactHeader.style.bottom = '0';
            contactHeader.style.top = 'auto';
        }
    });

    // 화살표 클릭 이벤트
    contactArrow.addEventListener('click', function() {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}); 