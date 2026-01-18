export interface Contributor {
    id: string;
    name: string;
    role: string;
    bio: string;
    avatarUrl?: string; // Optional: url to image
    socialUrl?: string; // Optional: Personal selection, GitHub, Twitter, etc.
    contributionCount: number;
    badges: string[]; // e.g. ['Pioneer', 'Top Rated']
}

export const CONTRIBUTORS: Contributor[] = [
    {
        id: '1',
        name: 'Alex Kim',
        role: 'Prompt Engineer',
        bio: 'AI와 자동화에 관심이 많은 풀스택 개발자입니다. 효율적인 코딩 프롬프트를 연구합니다.',
        contributionCount: 15,
        badges: ['Pioneer', 'Code Master'],
        socialUrl: 'https://github.com'
    },
    {
        id: '2',
        name: 'Sarah Lee',
        role: 'Content Creator',
        bio: '마케팅과 카피라이팅을 위한 창의적인 프롬프트를 만듭니다.',
        contributionCount: 8,
        badges: ['Creative Soul'],
        socialUrl: 'https://twitter.com'
    },
    {
        id: '3',
        name: 'PromptGenie Team',
        role: 'Admin',
        bio: 'PromptGenie 공식 팀입니다.',
        contributionCount: 50,
        badges: ['Admin', 'Verified'],
    }
];
