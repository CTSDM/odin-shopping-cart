import styles from "./Card.module.css";
import InputNumberItem from "./InputNumberItem";
import PropTypes from "prop-types";

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

Card.propTypes = {
    item: PropTypes.shape({
        category: PropTypes.string,
        count: PropTypes.number,
        description: PropTypes.string,
        id: PropTypes.number,
        image: PropTypes.string,
        price: PropTypes.number,
        rating: PropTypes.object,
        title: PropTypes.string,
    }),
    handleUpdate: PropTypes.func,
};

export default Card;
