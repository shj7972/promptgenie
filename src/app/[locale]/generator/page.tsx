'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface WizardStep {
    id: number;
    question: string;
    placeholder: string;
    field: string;
    suggestions: string[];
}

const STEPS: WizardStep[] = [
    {
        id: 1,
        question: "AI의 주요 역할은 무엇인가요?",
        placeholder: "예: 시니어 소프트웨어 엔지니어, 창의적인 작가, 비즈니스 컨설턴트",
        field: 'role',
        suggestions: ["시니어 소프트웨어 엔지니어", "마케팅 전문가", "전문 심리 상담사", "데이터 분석가", "소설가", "블로그 작가", "유튜브 크리에이터", "번역가"]
    },
    {
        id: 2,
        question: "어떤 구체적인 작업을 수행해야 하나요?",
        placeholder: "예: 코드 리뷰 수행, 여행 블로그 포스트 작성, 마케팅 계획 수립",
        field: 'task',
        suggestions: ["현 프로젝트 코드 리뷰", "블로그 포스트 작성", "주간 업무 보고서 요약", "비즈니스 기획서 초안", "제품 설명서 번역", "유튜브 대본 작성", "영어 이메일 번역", "면접 질문 생성"]
    },
    {
        id: 3,
        question: "포함되어야 할 세부 사항이나 맥락은 무엇인가요?",
        placeholder: "예: 특정 기술 스택, 타겟 오디언스, 기술적 제약 사항",
        field: 'context',
        suggestions: ["입문자 수준에 맞게", "기술적 제약 사항 고려", "타겟 오디언스: 2030 직장인", "핵심 데이터 요약 포함", "간결한 리스트 형태", "친절하고 공감하는 태도로", "SEO 최적화 키워드 포함", "마크다운 형식으로 출력"]
    },
    {
        id: 4,
        question: "원하는 어조나 스타일은 무엇인가요?",
        placeholder: "예: 전문적인, 유머러스한, 간결한, 학술적인",
        field: 'style',
        suggestions: ["전문적이고 신뢰감 있는", "유머러스하고 친근한", "학술적이고 객관적인", "명확하고 간결한", "호소력 있는", "감성적이고 따뜻한", "논리적이고 분석적인", "재치있는 비유를 사용하여"]
    },
];

export default function GeneratorPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            generatePrompt();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setFormData({ ...formData, [STEPS[currentStep].field]: suggestion });
    };

    const generatePrompt = () => {
        const prompt = `역할: ${formData.role || '[역할]'}. 
수행할 작업: ${formData.task || '[작업]'}.

세부 사항 및 맥락:
${formData.context || '[맥락]'}

출력 스타일:
의 대답은 ${formData.style || '[스타일]'} 어조여야 합니다. 높은 품질과 정확성을 유지해 주세요.`;

        setGeneratedPrompt(prompt);
        setCurrentStep(STEPS.length); // Final step
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPrompt);
        alert('프롬프트가 클립보드에 복사되었습니다!');
    };

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([generatedPrompt], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "generated-prompt.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className={styles.container}>
            <div className="section-container">
                <div className={styles.wizardCard + " glass"}>
                    {currentStep < STEPS.length ? (
                        <>
                            <div className={styles.progress}>
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                                ></div>
                            </div>
                            <div className={styles.stepInfo}>
                                <span className={styles.stepCount}>{STEPS.length}단계 중 {currentStep + 1}단계</span>
                                <h2 className={styles.question}>{STEPS[currentStep].question}</h2>
                            </div>
                            <textarea
                                className={styles.input}
                                placeholder={STEPS[currentStep].placeholder}
                                value={formData[STEPS[currentStep].field] || ''}
                                onChange={(e) => setFormData({ ...formData, [STEPS[currentStep].field]: e.target.value })}
                            />

                            <div className={styles.suggestions}>
                                <p className={styles.suggestionTitle}>추천 답변:</p>
                                <div className={styles.suggestionList}>
                                    {STEPS[currentStep].suggestions.map((item, index) => (
                                        <button
                                            key={index}
                                            className={styles.suggestionItem}
                                            onClick={() => handleSuggestionClick(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <button
                                    className={styles.backBtn}
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                >
                                    이전
                                </button>
                                <button className={styles.nextBtn} onClick={handleNext}>
                                    {currentStep === STEPS.length - 1 ? '프롬프트 생성' : '다음'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.resultContainer}>
                            <h2 className={styles.question}>생성된 프롬프트 결과</h2>
                            <div className={styles.promptBox}>
                                {isEditing ? (
                                    <textarea
                                        className={styles.editArea}
                                        value={generatedPrompt}
                                        onChange={(e) => setGeneratedPrompt(e.target.value)}
                                        rows={10}
                                    />
                                ) : (
                                    <pre>{generatedPrompt}</pre>
                                )}
                            </div>
                            <div className={styles.promptActions}>
                                <button
                                    className={styles.actionBtn}
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? '변경사항 저장' : '프롬프트 수정'}
                                </button>
                                <button className={styles.actionBtn} onClick={downloadTxtFile}>
                                    파일로 저장 (.txt)
                                </button>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.backBtn} onClick={() => setCurrentStep(0)}>
                                    다시 시작
                                </button>
                                <button className={styles.nextBtn} onClick={copyToClipboard}>
                                    클립보드 복사
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
