import styles from "./CardCheckout.module.css";

function CardCheckout({ item }) {
    return (
        <div className={styles["card-checkout"]}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.description}>{item.description}</div>
            <div className={styles["img-container"]}>
                <img
                    width={"100px"}
                    src={item.image}
                    alt={`Image of: ${item.title}`}
                />
            </div>
            <div>Items: {item.count}</div>
        </div>
    );
}

export default CardCheckout;
