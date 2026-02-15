import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: '프롬프트 엔지니어링 완벽 가이드 | PromptGenie',
    description: 'ChatGPT, Claude, Gemini 등 AI 모델을 위한 프롬프트 엔지니어링 핵심 원칙과 기법을 마스터하세요. Zero-shot, Few-shot, Chain of Thought 등 5가지 핵심 기법과 실전 활용법을 배워보세요.',
};

export default function GuidePage() {
    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <div className="section-container">
                    <h1 className={styles.title}><span className="gradient-text">프롬프트 엔지니어링</span> 완벽 가이드</h1>
                    <p className={styles.subtitle}>대규모 언어 모델(LLM)과 효과적으로 소통하기 위한 핵심 원칙과 실전 기법을 체계적으로 마스터하세요.</p>
                </div>
            </header>

            {/* 프롬프트 엔지니어링이란? */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>프롬프트 엔지니어링이란?</h2>
                    <div className={styles.introContent}>
                        <div className={`${styles.introCard} glass`}>
                            <p>
                                <strong>프롬프트 엔지니어링(Prompt Engineering)</strong>은 인공지능 언어 모델에게 최적의 입력(프롬프트)을 설계하여
                                원하는 출력을 이끌어내는 기술입니다. 동일한 AI 모델이라도 어떤 프롬프트를 주느냐에 따라
                                응답의 품질, 정확도, 창의성이 크게 달라집니다.
                            </p>
                            <p>
                                프롬프트 엔지니어링은 단순히 &quot;잘 질문하기&quot;가 아닙니다. AI의 작동 원리를 이해하고,
                                체계적인 프레임워크를 적용하여 일관되게 높은 품질의 결과물을 얻어내는 <strong>전문 기술</strong>입니다.
                                ChatGPT, Claude, Gemini 등 대부분의 LLM에서 적용할 수 있으며,
                                프롬프트 설계 능력은 AI 시대에서 가장 중요한 핵심 역량 중 하나로 자리잡고 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3가지 골든 룰 */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>3가지 골든 룰</h2>
                    <div className={styles.rulesGrid}>
                        <div className={`${styles.ruleCard} glass`}>
                            <span className={styles.ruleNumber}>01</span>
                            <h3>페르소나 정의 (Role Assignment)</h3>
                            <p>
                                AI에게 구체적인 역할을 부여하세요. 예를 들어 &quot;시니어 소프트웨어 아키텍트처럼 행동해줘&quot;와 같이
                                전문가의 역할을 지정하면, AI는 해당 분야의 전문 지식과 말투를 활용하여 답변합니다.
                                역할이 구체적일수록 AI의 응답 품질이 비약적으로 향상됩니다.
                            </p>
                        </div>
                        <div className={`${styles.ruleCard} glass`}>
                            <span className={styles.ruleNumber}>02</span>
                            <h3>제약 조건 제공 (Constraints)</h3>
                            <p>
                                하지 말아야 할 것을 명확히 하세요. 출력 형식, 글자 수, 사용할 언어, 피해야 할 표현 등
                                경계를 설정하면 환각 현상(hallucinations)이나 무관한 답변을 방지할 수 있습니다.
                                &quot;500자 이내로&quot;, &quot;불렛 포인트 형식으로&quot;, &quot;기술 용어 없이&quot;와 같은 구체적인 제약 조건을 포함하세요.
                            </p>
                        </div>
                        <div className={`${styles.ruleCard} glass`}>
                            <span className={styles.ruleNumber}>03</span>
                            <h3>예시 활용 (Few-Shot Learning)</h3>
                            <p>
                                기대하는 입출력 쌍의 예시를 제공하세요. 때로는 백 마디 설명보다 2~3개의 예시가 훨씬 강력한 지침이 됩니다.
                                AI는 주어진 패턴을 빠르게 학습하여 동일한 형식과 논리로 새로운 결과를 생성합니다.
                                이를 &quot;Few-Shot Prompting&quot;이라 부릅니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5가지 핵심 프롬프팅 기법 */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>5가지 핵심 프롬프팅 기법</h2>
                    <div className={styles.techniquesGrid}>
                        <div className={`${styles.techniqueCard} glass`}>
                            <div className={styles.techniqueHeader}>
                                <span className={styles.techniqueIcon}>🎯</span>
                                <h3>Zero-Shot Prompting</h3>
                            </div>
                            <p className={styles.techniqueDesc}>
                                예시 없이 직접 지시만으로 결과를 얻는 가장 기본적인 기법입니다.
                            </p>
                            <div className={styles.techniqueExample}>
                                <div className={styles.exampleLabel}>예시</div>
                                <code>&quot;다음 문장의 감정을 분석해줘: &apos;오늘 날씨가 정말 좋다&apos;&quot;</code>
                            </div>
                            <p className={styles.techniqueNote}>
                                <strong>적합한 경우:</strong> 간단한 분류, 요약, 번역 등 명확한 작업에 효과적입니다.
                                복잡한 추론이나 특정 형식이 필요한 경우에는 다른 기법을 결합하세요.
                            </p>
                        </div>

                        <div className={`${styles.techniqueCard} glass`}>
                            <div className={styles.techniqueHeader}>
                                <span className={styles.techniqueIcon}>📝</span>
                                <h3>Few-Shot Prompting</h3>
                            </div>
                            <p className={styles.techniqueDesc}>
                                2~5개의 입출력 예시를 제공하여 AI에게 원하는 패턴을 학습시키는 기법입니다.
                            </p>
                            <div className={styles.techniqueExample}>
                                <div className={styles.exampleLabel}>예시</div>
                                <code>
                                    &quot;긍정: 날씨가 좋다 → 😊{'\n'}부정: 비가 온다 → 😢{'\n'}분석: 오늘은 기분이 안좋다 → ?&quot;
                                </code>
                            </div>
                            <p className={styles.techniqueNote}>
                                <strong>적합한 경우:</strong> 특정 형식, 논리, 또는 스타일의 결과물이 필요할 때 매우 효과적입니다.
                                예시가 명확하고 일관될수록 결과 품질이 높아집니다.
                            </p>
                        </div>

                        <div className={`${styles.techniqueCard} glass`}>
                            <div className={styles.techniqueHeader}>
                                <span className={styles.techniqueIcon}>🔗</span>
                                <h3>Chain of Thought (CoT)</h3>
                            </div>
                            <p className={styles.techniqueDesc}>
                                AI에게 &quot;단계별로 생각하라&quot;고 지시하여 추론 과정을 거치게 하는 기법입니다.
                            </p>
                            <div className={styles.techniqueExample}>
                                <div className={styles.exampleLabel}>예시</div>
                                <code>&quot;이 문제를 단계별로(step-by-step) 풀어줘. 각 단계의 논리적 근거를 설명해줘.&quot;</code>
                            </div>
                            <p className={styles.techniqueNote}>
                                <strong>적합한 경우:</strong> 수학 문제, 논리적 추론, 코드 디버깅, 복잡한 분석 등
                                중간 사고 과정이 중요한 작업에서 정확도를 크게 향상시킵니다.
                            </p>
                        </div>

                        <div className={`${styles.techniqueCard} glass`}>
                            <div className={styles.techniqueHeader}>
                                <span className={styles.techniqueIcon}>🎭</span>
                                <h3>Role Playing</h3>
                            </div>
                            <p className={styles.techniqueDesc}>
                                AI에게 특정 전문가, 캐릭터, 또는 관점의 역할을 부여하는 기법입니다.
                            </p>
                            <div className={styles.techniqueExample}>
                                <div className={styles.exampleLabel}>예시</div>
                                <code>&quot;당신은 10년 경력의 UX 디자인 리드입니다. 이 앱의 온보딩 플로우를 비판적으로 검토해주세요.&quot;</code>
                            </div>
                            <p className={styles.techniqueNote}>
                                <strong>적합한 경우:</strong> 전문적인 조언, 다각도 분석, 면접 연습, 글쓰기 스타일 지정 등
                                특정 전문성이나 관점이 필요한 모든 작업에 활용 가능합니다.
                            </p>
                        </div>

                        <div className={`${styles.techniqueCard} glass`}>
                            <div className={styles.techniqueHeader}>
                                <span className={styles.techniqueIcon}>🧩</span>
                                <h3>Structured Output</h3>
                            </div>
                            <p className={styles.techniqueDesc}>
                                JSON, 표, 마크다운 등 특정 출력 형식을 지정하여 구조화된 결과를 얻는 기법입니다.
                            </p>
                            <div className={styles.techniqueExample}>
                                <div className={styles.exampleLabel}>예시</div>
                                <code>&quot;분석 결과를 다음 JSON 형식으로 출력해줘: {'{'}&quot;sentiment&quot;: string, &quot;score&quot;: number, &quot;keywords&quot;: string[]{'}'}&quot;</code>
                            </div>
                            <p className={styles.techniqueNote}>
                                <strong>적합한 경우:</strong> 데이터 처리 파이프라인, API 응답 생성, 보고서 자동화 등
                                프로그래밍과 결합하여 AI 출력을 자동으로 처리해야 할 때 필수적입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 비교: 좋은 예 vs 나쁜 예 */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>비교: 좋은 예 vs 나쁜 예</h2>
                    <div className={styles.comparisonGrid}>
                        <div className={styles.comparisonCard}>
                            <div className={styles.badLabel}>나쁜 예시</div>
                            <div className={styles.promptText}>
                                &quot;고양이에 대한 짧은 이야기를 써줘.&quot;
                            </div>
                            <p className={styles.analysis}>너무 모호합니다. AI는 말투, 길이, 줄거리에 대한 맥락을 알 수 없습니다. 결과물의 품질이 운에 달려 있게 됩니다.</p>
                        </div>
                        <div className={styles.comparisonCard}>
                            <div className={styles.goodLabel}>좋은 예시</div>
                            <div className={styles.promptText}>
                                &quot;전문적인 창의적 작가처럼 행동해줘. 사실은 비밀 요원인 고양이에 대한 300자 내외의 위트 있는 짧은 이야기를 써줘. 비 내리는 골목에서의 긴장감 넘치는 만남에 집중해줘.&quot;
                            </div>
                            <p className={styles.analysis}>명확한 페르소나, 구체적인 제약 조건(300자, 위트 있는), 그리고 확실한 줄거리 맥락이 포함되어 있습니다.</p>
                        </div>
                    </div>

                    <div className={styles.comparisonGrid} style={{ marginTop: '2rem' }}>
                        <div className={styles.comparisonCard}>
                            <div className={styles.badLabel}>나쁜 예시</div>
                            <div className={styles.promptText}>
                                &quot;이 코드를 고쳐줘.&quot;
                            </div>
                            <p className={styles.analysis}>어떤 언어인지, 어떤 에러가 발생하는지, 원하는 동작이 무엇인지 일체 정보가 없어 AI가 추측에 의존합니다.</p>
                        </div>
                        <div className={styles.comparisonCard}>
                            <div className={styles.goodLabel}>좋은 예시</div>
                            <div className={styles.promptText}>
                                &quot;시니어 백엔드 개발자 역할을 해줘. 아래 Python FastAPI 코드에서 DB 커넥션 풀 누수가 발생하고 있어. 에러: &apos;Too many connections&apos;. 원인을 분석하고 해결책을 제시해줘.&quot;
                            </div>
                            <p className={styles.analysis}>역할, 기술 스택, 구체적 에러 메시지, 원하는 출력이 모두 명시되어 있어 정확한 진단이 가능합니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 모델별 특징 비교 */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>AI 모델별 특징 비교</h2>
                    <div className={styles.modelGrid}>
                        <div className={`${styles.modelCard} glass`}>
                            <div className={styles.modelHeader}>
                                <span className={styles.modelIcon}>🟢</span>
                                <h3>ChatGPT (OpenAI)</h3>
                            </div>
                            <ul className={styles.modelFeatures}>
                                <li><strong>강점:</strong> 범용성이 뛰어나고 다양한 작업에서 안정적인 성능</li>
                                <li><strong>특화:</strong> 창의적 글쓰기, 코드 생성, 대화형 상호작용</li>
                                <li><strong>팁:</strong> System 프롬프트를 활용한 역할 설정이 매우 효과적</li>
                                <li><strong>주의:</strong> 최신 정보에 대한 환각 가능성, 긴 대화에서 맥락 손실</li>
                            </ul>
                        </div>
                        <div className={`${styles.modelCard} glass`}>
                            <div className={styles.modelHeader}>
                                <span className={styles.modelIcon}>🟠</span>
                                <h3>Claude (Anthropic)</h3>
                            </div>
                            <ul className={styles.modelFeatures}>
                                <li><strong>강점:</strong> 긴 문서 분석과 세밀한 지시 따르기에 탁월</li>
                                <li><strong>특화:</strong> 코드 리뷰, 학술적 분석, 복잡한 추론, 장문 처리</li>
                                <li><strong>팁:</strong> XML 태그를 활용한 구조화된 프롬프트에 잘 반응</li>
                                <li><strong>주의:</strong> 때로 과도하게 신중한 답변, 창의적 자유도가 상대적으로 낮음</li>
                            </ul>
                        </div>
                        <div className={`${styles.modelCard} glass`}>
                            <div className={styles.modelHeader}>
                                <span className={styles.modelIcon}>🔵</span>
                                <h3>Gemini (Google)</h3>
                            </div>
                            <ul className={styles.modelFeatures}>
                                <li><strong>강점:</strong> 최신 정보 접근과 멀티모달(텍스트+이미지) 처리</li>
                                <li><strong>특화:</strong> 정보 검색, 데이터 분석, 이미지 해석, Google 도구 연동</li>
                                <li><strong>팁:</strong> 구체적인 출력 형식 지정(표, JSON 등)에 잘 반응</li>
                                <li><strong>주의:</strong> 때로 지나치게 간결한 답변, 복잡한 코딩 작업에서 불안정</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 카테고리별 활용 팁 */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>카테고리별 프롬프트 활용 팁</h2>
                    <div className={styles.tipsGrid}>
                        <div className={`${styles.tipCard} glass`}>
                            <h3>✍️ 글쓰기</h3>
                            <p>AI에게 정확한 역할(Role)을 부여하고, 원하는 톤(Tone), 길이(Length), 타겟 독자(Target Audience)를 명확히 지정하세요. 초안 생성 후 반복적인 피드백으로 완성도를 높이는 것이 핵심입니다.</p>
                        </div>
                        <div className={`${styles.tipCard} glass`}>
                            <h3>💻 코딩</h3>
                            <p>프로그래밍 언어, 프레임워크 버전, 프로젝트의 기술 스택을 명시하세요. &quot;이 코드를 리뷰해줘&quot;보다 &quot;TypeScript 5.0 + React 18 환경에서 이 커스텀 훅의 성능 최적화 포인트를 분석해줘&quot;가 훨씬 유용한 답변을 이끌어냅니다.</p>
                        </div>
                        <div className={`${styles.tipCard} glass`}>
                            <h3>📊 비즈니스</h3>
                            <p>산업 분야, 회사 규모, 현재 과제를 구체적으로 설명하세요. &quot;세계적인 경영 컨설턴트&quot;와 같은 전문가 역할을 부여하고, 결과물을 &quot;표 형식&quot; 또는 &quot;불렛 포인트&quot;로 요청하면 실무 보고서에 바로 활용 가능합니다.</p>
                        </div>
                        <div className={`${styles.tipCard} glass`}>
                            <h3>📚 학습</h3>
                            <p>자신의 현재 이해 수준을 솔직하게 알려주고, &quot;왜?&quot;라는 질문을 계속 이어가세요. &quot;10세 아이가 이해할 수 있게 설명해줘&quot; 또는 &quot;실생활 비유로 설명해줘&quot;와 같이 요청하면 추상적 개념도 직관적으로 이해할 수 있습니다.</p>
                        </div>
                        <div className={`${styles.tipCard} glass`}>
                            <h3>💡 아이디어</h3>
                            <p>SCAMPER, 제1원칙, 역발상 등 체계적인 프레임워크를 AI에 적용하면 혁신적인 아이디어를 도출할 수 있습니다. 한 번에 그치지 말고 반복적으로 정제하고 발전시키세요.</p>
                        </div>
                        <div className={`${styles.tipCard} glass`}>
                            <h3>🎨 디자인 &amp; 창작</h3>
                            <p>디자인 목적, 타겟 사용자, 브랜드 정체성을 전달하세요. 이미지 생성 AI에는 조명, 카메라 앵글, 텍스처, 아트 스타일 등 시각적 요소를 구체적으로 묘사하면 원하는 결과에 가까워집니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 자주 하는 실수 */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>자주 하는 실수 &amp; 해결 방법</h2>
                    <div className={styles.mistakesGrid}>
                        <div className={`${styles.mistakeCard} glass`}>
                            <div className={styles.mistakeHeader}>
                                <span className={styles.mistakeX}>✗</span>
                                <h4>너무 모호한 지시</h4>
                            </div>
                            <p>&quot;좋은 글을 써줘&quot;처럼 구체적이지 않은 프롬프트는 AI가 방향을 잡기 어렵습니다.</p>
                            <div className={styles.solution}>
                                <span className={styles.solutionCheck}>✓</span>
                                <span>주제, 분량, 톤, 타겟 독자, 출력 형식을 명시하세요.</span>
                            </div>
                        </div>
                        <div className={`${styles.mistakeCard} glass`}>
                            <div className={styles.mistakeHeader}>
                                <span className={styles.mistakeX}>✗</span>
                                <h4>한 번에 모든 것을 요청</h4>
                            </div>
                            <p>복잡한 작업을 하나의 프롬프트에 몰아넣으면 결과의 품질이 떨어집니다.</p>
                            <div className={styles.solution}>
                                <span className={styles.solutionCheck}>✓</span>
                                <span>작업을 단계별로 분리하여 순차적으로 진행하세요.</span>
                            </div>
                        </div>
                        <div className={`${styles.mistakeCard} glass`}>
                            <div className={styles.mistakeHeader}>
                                <span className={styles.mistakeX}>✗</span>
                                <h4>결과를 맹신</h4>
                            </div>
                            <p>AI는 종종 그럴듯하지만 틀린 정보(환각)를 생성합니다. 무비판적으로 수용하면 안 됩니다.</p>
                            <div className={styles.solution}>
                                <span className={styles.solutionCheck}>✓</span>
                                <span>중요한 사실은 반드시 교차 검증하고, AI에게 &quot;확신도&quot;를 함께 표시하도록 요청하세요.</span>
                            </div>
                        </div>
                        <div className={`${styles.mistakeCard} glass`}>
                            <div className={styles.mistakeHeader}>
                                <span className={styles.mistakeX}>✗</span>
                                <h4>반복 요청 없이 포기</h4>
                            </div>
                            <p>첫 번째 결과가 마음에 들지 않으면 바로 포기하는 경우가 많습니다.</p>
                            <div className={styles.solution}>
                                <span className={styles.solutionCheck}>✓</span>
                                <span>&quot;좀 더 구체적으로&quot;, &quot;다른 관점에서&quot;, &quot;이 부분을 강화해서&quot; 등 피드백을 주어 반복 정제하세요.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 용어 사전 */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>프롬프트 엔지니어링 용어 사전</h2>
                    <div className={`${styles.glossaryGrid} glass`}>
                        <div className={styles.glossaryItem}>
                            <dt>LLM (Large Language Model)</dt>
                            <dd>대규모 텍스트 데이터를 학습한 거대 언어 모델. ChatGPT, Claude, Gemini 등이 대표적입니다.</dd>
                        </div>
                        <div className={styles.glossaryItem}>
                            <dt>Hallucination (환각)</dt>
                            <dd>AI가 사실처럼 보이지만 실제로는 틀린 정보를 생성하는 현상입니다.</dd>
                        </div>
                        <div className={styles.glossaryItem}>
                            <dt>Token (토큰)</dt>
                            <dd>AI가 텍스트를 처리하는 기본 단위. 단어, 문자, 또는 서브워드일 수 있습니다. 프롬프트와 응답의 길이가 토큰 수로 제한됩니다.</dd>
                        </div>
                        <div className={styles.glossaryItem}>
                            <dt>Temperature (온도)</dt>
                            <dd>AI 응답의 무작위성을 조절하는 파라미터. 낮으면(0~0.3) 일관되고 정확한 답변, 높으면(0.7~1.0) 창의적이고 다양한 답변을 생성합니다.</dd>
                        </div>
                        <div className={styles.glossaryItem}>
                            <dt>System Prompt (시스템 프롬프트)</dt>
                            <dd>AI의 기본 행동 방식, 역할, 제약 조건을 설정하는 프롬프트입니다. 사용자 메시지 이전에 적용됩니다.</dd>
                        </div>
                        <div className={styles.glossaryItem}>
                            <dt>Context Window (맥락 창)</dt>
                            <dd>AI가 한 번에 처리할 수 있는 최대 토큰 수. 이 범위를 넘어서면 초기 대화 내용을 잊게 됩니다.</dd>
                        </div>
                        <div className={styles.glossaryItem}>
                            <dt>Fine-tuning (미세 조정)</dt>
                            <dd>특정 작업이나 도메인에 맞게 기존 AI 모델을 추가적으로 학습시키는 과정입니다.</dd>
                        </div>
                        <div className={styles.glossaryItem}>
                            <dt>RAG (Retrieval-Augmented Generation)</dt>
                            <dd>외부 데이터를 검색하여 AI의 응답에 결합하는 기법. 환각을 줄이고 최신 정보를 반영할 수 있습니다.</dd>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.section}>
                <div className="section-container">
                    <div className={`${styles.ctaSection} glass`}>
                        <h2>지금 바로 실전에 활용해 보세요</h2>
                        <p>PromptGenie 라이브러리에서 90개 이상의 검증된 프롬프트를 탐색하고, 프롬프트 생성 도구로 나만의 맞춤 프롬프트를 만들어 보세요.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/library" className={styles.ctaPrimary}>라이브러리 탐색</Link>
                            <Link href="/generator" className={styles.ctaSecondary}>프롬프트 생성기</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
