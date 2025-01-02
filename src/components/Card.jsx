import styles from "./Card.module.css";
import InputNumberItem from "./InputNumberItem";

function Card({ item, handlerUpdateProducts }) {
    return (
        <div className={styles.card} role="button">
            <div className={styles["image-container"]}>
                <img src={item.image} alt={`Image of: ${item.title}`} />
            </div>
            <div className={styles.title} title={item.title}>
                {item.title}
            </div>
            <div className={styles.price}>{item.price}$</div>
            <div>Items added: {item.count}</div>
            <button
                type="button"
                onClick={() => handlerUpdateProducts(item.id, 1)}
            >
                Add 1
            </button>
            <InputNumberItem
                id={item.id}
                increaseSelfProductCount={handlerUpdateProducts}
            />
        </div>
    );
}

export default Card;
