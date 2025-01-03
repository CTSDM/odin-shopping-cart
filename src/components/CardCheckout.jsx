import InputCheckout from "./InputCheckout";
import styles from "./CardCheckout.module.css";

function CardCheckout({ item, handleUpdate }) {
    function handleUpdateCurrying(id) {
        return function (type) {
            handleUpdate(id, type);
        };
    }
    return (
        <div className={styles["card-checkout"]}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles["img-container"]}>
                <img src={item.image} alt={`Image of: ${item.title}`} />
            </div>
            <div className={styles["container-info"]}>
                <span>Price: </span>
                <span className={styles.content}>{item.price}$</span>
            </div>
            <div className={styles["container-info"]}>
                <span>Items: </span>
                <span className={styles.content}>{item.count}</span>
            </div>
            <InputCheckout
                count={item.count}
                handleUpdate={handleUpdateCurrying(item.id)}
            />
        </div>
    );
}

export default CardCheckout;
