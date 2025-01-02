import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.info}>
                <h1>Delta Sigma (fake) store.</h1>
                <h2>Your must stop for high quality and trending products.</h2>
                <h3>
                    We are proud to announce that for 2025 we are working on
                    exclusive deals with several companies to provide the best
                    price on the market.
                </h3>
            </div>
            <div></div>
        </div>
    );
}

export default Home;
