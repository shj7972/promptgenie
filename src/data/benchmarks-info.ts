export interface BenchmarkInfo {
  id: string;
  name: string;
  nameKo: string;
  fullName: string;
  fullNameKo: string;
  description: string;
  descriptionKo: string;
  category: 'reasoning' | 'coding' | 'math' | 'science' | 'general' | 'safety';
  scoreRange: string;
  higherIsBetter: boolean;
  humanBaseline?: number;
  importance: 'critical' | 'high' | 'medium';
  year: number;
  link?: string;
}

export const BENCHMARKS_INFO: BenchmarkInfo[] = [
  {
    id: 'mmlu',
    name: 'MMLU',
    nameKo: 'MMLU',
    fullName: 'Massive Multitask Language Understanding',
    fullNameKo: '대규모 다중 작업 언어 이해',
    description: 'Tests knowledge across 57 academic subjects including STEM, humanities, and social sciences. Questions are multiple-choice covering undergraduate to professional level.',
    descriptionKo: 'STEM, 인문학, 사회과학을 포함한 57개 학문 분야의 지식을 테스트합니다. 학부 수준부터 전문가 수준까지 객관식 문제로 구성.',
    category: 'general',
    scoreRange: '0-100%',
    higherIsBetter: true,
    humanBaseline: 89.8,
    importance: 'critical',
    year: 2020,
    link: 'https://arxiv.org/abs/2009.03300',
  },
  {
    id: 'humaneval',
    name: 'HumanEval',
    nameKo: '휴먼이밸',
    fullName: 'HumanEval Coding Benchmark',
    fullNameKo: '휴먼이밸 코딩 벤치마크',
    description: 'OpenAI\'s code generation benchmark with 164 Python programming problems. Tests functional correctness by running generated code against test cases.',
    descriptionKo: '164개의 Python 프로그래밍 문제로 구성된 OpenAI의 코드 생성 벤치마크. 생성된 코드를 테스트 케이스로 실행하여 기능적 정확성 평가.',
    category: 'coding',
    scoreRange: '0-100% (pass@1)',
    higherIsBetter: true,
    humanBaseline: 65.0,
    importance: 'critical',
    year: 2021,
    link: 'https://arxiv.org/abs/2107.03374',
  },
  {
    id: 'math',
    name: 'MATH',
    nameKo: 'MATH',
    fullName: 'MATH Benchmark',
    fullNameKo: 'MATH 벤치마크',
    description: 'Comprehensive math benchmark with 12,500 competition-style problems across algebra, calculus, number theory, and more. Ranges from AMC to AIME difficulty.',
    descriptionKo: '대수, 미적분, 정수론 등 12,500개 경시대회 스타일 문제. AMC부터 AIME 수준의 난이도.',
    category: 'math',
    scoreRange: '0-100%',
    higherIsBetter: true,
    humanBaseline: 40.0,
    importance: 'high',
    year: 2021,
    link: 'https://arxiv.org/abs/2103.03874',
  },
  {
    id: 'gpqa',
    name: 'GPQA',
    nameKo: 'GPQA',
    fullName: 'Graduate-Level Google-Proof Q&A',
    fullNameKo: '대학원 수준 구글-프루프 Q&A',
    description: 'Extremely difficult questions requiring expert-level knowledge in biology, physics, and chemistry. Even domain experts score ~65%; designed so internet search doesn\'t help.',
    descriptionKo: '생물학, 물리학, 화학에서 전문가 수준의 지식이 필요한 매우 어려운 문제들. 도메인 전문가도 ~65% 점수; 인터넷 검색이 도움이 되지 않도록 설계.',
    category: 'science',
    scoreRange: '0-100%',
    higherIsBetter: true,
    humanBaseline: 65.0,
    importance: 'high',
    year: 2023,
    link: 'https://arxiv.org/abs/2311.12022',
  },
  {
    id: 'swe_bench',
    name: 'SWE-bench',
    nameKo: 'SWE-벤치',
    fullName: 'Software Engineering Benchmark',
    fullNameKo: '소프트웨어 엔지니어링 벤치마크',
    description: 'Real GitHub issues that require understanding codebases and implementing fixes. Tests practical software engineering ability with 300 curated issues from popular Python repos.',
    descriptionKo: '코드베이스 이해 및 수정 구현이 필요한 실제 GitHub 이슈. 인기 Python 저장소의 300개 큐레이션된 이슈로 실제 소프트웨어 엔지니어링 능력 테스트.',
    category: 'coding',
    scoreRange: '0-100% (resolved)',
    higherIsBetter: true,
    importance: 'critical',
    year: 2023,
    link: 'https://www.swebench.com',
  },
  {
    id: 'arc_agi_2',
    name: 'ARC-AGI-2',
    nameKo: 'ARC-AGI-2',
    fullName: 'Abstraction and Reasoning Corpus for AGI v2',
    fullNameKo: 'AGI를 위한 추상화 및 추론 코퍼스 v2',
    description: 'Tests core cognitive abilities that require flexible reasoning from few examples. Heavily revised version with tasks humans find easy but AI finds extremely hard.',
    descriptionKo: '소수의 예시에서 유연한 추론이 필요한 핵심 인지 능력 테스트. 인간은 쉽지만 AI는 매우 어려운 작업으로 대폭 개정된 버전.',
    category: 'reasoning',
    scoreRange: '0-100%',
    higherIsBetter: true,
    humanBaseline: 98.0,
    importance: 'high',
    year: 2024,
    link: 'https://arcprize.org',
  },
  {
    id: 'hle',
    name: 'HLE',
    nameKo: 'HLE',
    fullName: 'Humanity\'s Last Exam',
    fullNameKo: '인류의 마지막 시험',
    description: 'Crowdsourced from top experts worldwide, covering the hardest questions across all academic disciplines. Designed to be the most comprehensive and difficult benchmark.',
    descriptionKo: '전 세계 최고 전문가들이 크라우드소싱하여 모든 학문 분야에서 가장 어려운 문제들을 수집. 가장 포괄적이고 어려운 벤치마크로 설계.',
    category: 'general',
    scoreRange: '0-100%',
    higherIsBetter: true,
    importance: 'high',
    year: 2025,
    link: 'https://lastexam.ai',
  },
  {
    id: 'aime2025',
    name: 'AIME 2025',
    nameKo: 'AIME 2025',
    fullName: 'American Invitational Mathematics Examination 2025',
    fullNameKo: '2025년 미국 초청 수학 시험',
    description: 'Official 2025 AIME competition problems. Top 2.5% of AMC 10/12 participants qualify. 15 problems requiring deep mathematical insight and computation.',
    descriptionKo: '공식 2025년 AIME 경시대회 문제. AMC 10/12 참가자 상위 2.5%가 참가 자격. 깊은 수학적 통찰과 계산이 필요한 15개 문제.',
    category: 'math',
    scoreRange: '0-15 (problems correct)',
    higherIsBetter: true,
    importance: 'medium',
    year: 2025,
  },
  {
    id: 'arena_elo',
    name: 'Arena ELO',
    nameKo: '아레나 ELO',
    fullName: 'LMSYS Chatbot Arena ELO Rating',
    fullNameKo: 'LMSYS 챗봇 아레나 ELO 레이팅',
    description: 'Human preference ratings from LMSYS Chatbot Arena where users vote on blind head-to-head comparisons. Most comprehensive real-world measure of model quality.',
    descriptionKo: '사용자가 블라인드 1:1 비교에서 투표하는 LMSYS 챗봇 아레나의 인간 선호도 평가. 모델 품질의 가장 포괄적인 실제 척도.',
    category: 'general',
    scoreRange: '1000+ (ELO scale)',
    higherIsBetter: true,
    importance: 'critical',
    year: 2023,
    link: 'https://lmarena.ai',
  },
];

export const getBenchmarkInfo = (id: string): BenchmarkInfo | undefined =>
  BENCHMARKS_INFO.find(b => b.id === id);

export const getBenchmarksByCategory = (category: BenchmarkInfo['category']): BenchmarkInfo[] =>
  BENCHMARKS_INFO.filter(b => b.category === category);
