import React from 'react';

export default function PartnerBanners() {
    return (
        <div style={{ backgroundColor: 'var(--background-start)', padding: '2rem 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="section-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="https://stock-insight.app" target="_blank" rel="noopener noreferrer">
                    <img src="https://stock-insight.app/static/banner_link_234x60.png" alt="내 주식, 살까 팔까? Stock Insight AI 분석 결과 보기" width="234" height="60" style={{ border: 0, borderRadius: '4px' }} />
                </a>
                <a href="https://unsedam.kr" target="_blank" rel="noopener noreferrer">
                    <img src="https://unsedam.kr/static/images/banner_link_234x60.png" alt="운세담 - 2026 무료 토정비결 & AI 사주" width="234" height="60" style={{ border: 'none', borderRadius: '4px' }} />
                </a>
                <a href="https://vibecheck.page" target="_blank" rel="noopener noreferrer" title="VibeCheck - 나를 찾는 트렌디한 심리테스트">
                    <img src="https://vibecheck.page/images/vibecheck_banner_234x60.png" alt="VibeCheck 배너" width="234" height="60" style={{ border: '1px solid #eee', borderRadius: '4px' }} />
                </a>
            </div>
        </div>
    );
}
