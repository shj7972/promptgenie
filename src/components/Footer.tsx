import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="section-container">
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <span className="gradient-text">Prompt</span>Genie
                        </div>
                        <p className={styles.description}>
                            엄선된 프롬프트와 강력한 생성 도구를 통해 AI의 잠재력을 최대한 활용하세요.
                        </p>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4>플랫폼</h4>
                            <a href="/library">라이브러리</a>
                            <a href="/generator">생성기</a>
                            <a href="/guide">가이드</a>
                        </div>
                        <div className={styles.column}>
                            <h4>커뮤니티</h4>
                            <a href="/explore">탐색</a>
                            <a href="/trending">인기 프롬프트</a>
                            <a href="/contributors">기여자</a>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; 2026 PromptGenie. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
