'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

const STEP_FIELDS = ['role', 'task', 'context', 'style'] as const;

export default function GeneratorPage() {
    const t = useTranslations('Generator');

    const steps = t.raw('steps') as Array<{
        question: string;
        placeholder: string;
        suggestions: string[];
    }>;

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            generatePrompt();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setFormData({ ...formData, [STEP_FIELDS[currentStep]]: suggestion });
    };

    const generatePrompt = () => {
        const prompt = t('promptTemplate')
            .replace('{role}', formData.role || t('rolePlaceholder'))
            .replace('{task}', formData.task || t('taskPlaceholder'))
            .replace('{context}', formData.context || t('contextPlaceholder'))
            .replace('{style}', formData.style || t('stylePlaceholder'));

        setGeneratedPrompt(prompt);
        setCurrentStep(steps.length);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPrompt);
        alert(t('copied'));
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
                    {currentStep < steps.length ? (
                        <>
                            <div className={styles.progress}>
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                ></div>
                            </div>
                            <div className={styles.stepInfo}>
                                <span className={styles.stepCount}>
                                    {t('stepOf', { current: currentStep + 1, total: steps.length })}
                                </span>
                                <h2 className={styles.question}>{steps[currentStep].question}</h2>
                            </div>
                            <textarea
                                className={styles.input}
                                placeholder={steps[currentStep].placeholder}
                                value={formData[STEP_FIELDS[currentStep]] || ''}
                                onChange={(e) => setFormData({ ...formData, [STEP_FIELDS[currentStep]]: e.target.value })}
                            />

                            <div className={styles.suggestions}>
                                <p className={styles.suggestionTitle}>{t('suggestionTitle')}</p>
                                <div className={styles.suggestionList}>
                                    {steps[currentStep].suggestions.map((item, index) => (
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
                                    {t('back')}
                                </button>
                                <button className={styles.nextBtn} onClick={handleNext}>
                                    {currentStep === steps.length - 1 ? t('generate') : t('next')}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.resultContainer}>
                            <h2 className={styles.question}>{t('resultTitle')}</h2>
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
                                    {isEditing ? t('saveChanges') : t('editPrompt')}
                                </button>
                                <button className={styles.actionBtn} onClick={downloadTxtFile}>
                                    {t('saveFile')}
                                </button>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.backBtn} onClick={() => setCurrentStep(0)}>
                                    {t('restart')}
                                </button>
                                <button className={styles.nextBtn} onClick={copyToClipboard}>
                                    {t('copyClipboard')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
