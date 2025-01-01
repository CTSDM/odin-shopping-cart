import styles from "./CardCheckout.module.css";
import InputCheckout from "./InputCheckout";

function CardCheckout({ item, handleUpdate }) {
    function handleUpdateCurrying(id) {
        return function (type) {
            handleUpdate(id, type);
        };
    }
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
            <InputCheckout
                count={item.count}
                handleUpdate={handleUpdateCurrying(item.id)}
            />
        </div>
    );
}

export default CardCheckout;
