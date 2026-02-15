'use client';

import React, { useEffect, useState } from 'react';

const ALL_BANNERS = [
    {
        href: "https://stock-insight.app",
        img: "https://stock-insight.app/static/banner_link_234x60.png",
        alt: "내 주식, 살까 팔까? Stock Insight AI 분석 결과 보기",
        style: { border: 0, borderRadius: '4px' }
    },
    {
        href: "https://unsedam.kr",
        img: "https://unsedam.kr/static/images/banner_link_234x60.png",
        alt: "운세담 - 2026 무료 토정비결 & AI 사주",
        style: { border: 'none', borderRadius: '4px' }
    },
    {
        href: "https://vibecheck.page",
        img: "https://vibecheck.page/images/vibecheck_banner_234x60.png",
        alt: "VibeCheck 배너",
        title: "VibeCheck - 나를 찾는 트렌디한 심리테스트",
        style: { border: '1px solid #eee', borderRadius: '4px' }
    },
    {
        href: "https://irumlab.com",
        img: "https://irumlab.com/banner_link_234x60.png",
        alt: "이룸랩 배너",
        title: "이룸랩 - 무료 셀프 작명, 영어 닉네임, 브랜드 네이밍",
        style: { border: '0', borderRadius: '4px' }
    },
    {
        href: "https://nutrimatch.kr",
        img: "https://nutrimatch.kr/banner_link_234x60.png",
        alt: "내 몸이 진짜 원하는 영양제는? Nutri-Match 분석 결과 보기",
        title: "Nutri-Match - 나만의 영양제 궁합 & 저속노화 분석기",
        style: { border: '0', borderRadius: '4px' }
    },
    {
        href: "https://moneymatch.kr",
        img: "https://moneymatch.kr/banner_link_234x60.png",
        alt: "놓치면 손해 보는 정부지원금, 3초 만에 찾기 - Money Match",
        title: "Money Match - AI 실시간 금융 뉴스 & 지원금 매칭",
        style: { border: '0', borderRadius: '4px' }
    },
    {
        href: "https://dream645.kr",
        img: "https://dream645.kr/banner_234x60.png",
        alt: "꿈풀이 로또 배너",
        title: "꿈풀이 로또 - 꿈이 현실이 되는 행운의 번호",
        style: { border: '0', borderRadius: '4px' }
    },
    {
        href: "https://sonpyeong.kr",
        img: "https://sonpyeong.kr/banner-234x60.png",
        alt: "손평마스터 - 손해평가사 합격의 파트너",
        title: "손평마스터 - 손해평가사 합격의 파트너",
        style: { border: '0', borderRadius: '4px' }
    }
];

export default function PartnerBanners() {
    const [randomBanners, setRandomBanners] = useState<typeof ALL_BANNERS>([]);

    useEffect(() => {
        // Shuffle array and pick 3
        const shuffled = [...ALL_BANNERS].sort(() => 0.5 - Math.random());
        setRandomBanners(shuffled.slice(0, 3));
    }, []);

    if (randomBanners.length === 0) {
        return null; // or return a skeleton/placeholder if preferred
    }

    return (
        <div style={{ backgroundColor: 'var(--background-start)', padding: '2rem 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="section-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                {randomBanners.map((banner) => (
                    <a key={banner.href} href={banner.href} target="_blank" rel="noopener noreferrer" title={banner.title}>
                        <img
                            src={banner.img}
                            alt={banner.alt}
                            width="234"
                            height="60"
                            style={banner.style}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}
