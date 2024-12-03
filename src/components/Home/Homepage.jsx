import React from "react";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <div>
            {/* Header Section */}
            <header className={styles.mainHeader}>
                <div className={styles.container}>
                    <div className={styles.logo}>RAC Selector</div>
                    <nav className={styles.navMenu}>
                        <a href="index.html">Home</a>
                        <a href="#about">About</a>
                        <a href="#features">Features</a>
                        <a href="/Dashboard" className={styles.signInRegister}>
                            Sign In/Register
                        </a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>Welcome to the Future of Interviews</h1>
                    <p>Experience a Real-Life Board Room Interview Simulation</p>
                    <a href="/Dashboard" className={styles.ctaButton}>
                        Get Started
                    </a>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className={styles.aboutSection}>
                <div className={styles.container}>
                    <h2>About RAC Selector</h2>
                    <p>
                        Our platform offers an advanced interview simulation experience
                        for candidates and interviewers alike, ensuring unbiased and
                        objective selection processes.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className={styles.featuresSection}>
                <div className={styles.container}>
                    <h2>Features</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <h3>Realistic Interviews</h3>
                            <p>
                                Engage in interactive and realistic interviews that mimic
                                real-world scenarios.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <h3>Scoring System</h3>
                            <p>
                                Quantifiable scoring based on relevancy and quality of
                                responses.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <h3>Easy Management</h3>
                            <p>
                                Admins can manage users, schedule interviews, and view
                                detailed reports effortlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <p>© 2024 RAC Selector. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;