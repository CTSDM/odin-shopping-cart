import "./cards.css";
import InputNumberItem from "./InputNumberItem";

function Card({ item, handlerUpdateProducts, index }) {
    return (
        <div className="card">
            <div>{item.title}</div>
            <div>{item.description}</div>
            <img
                width={"100px"}
                src={item.image}
                alt={`Image of: ${item.title}`}
            />
            <div>Items added: {item.count}</div>
            <button
                type="button"
                onClick={() => handlerUpdateProducts(index, 1)}
            >
                press to increase 1
            </button>
            <InputNumberItem
                increaseSelfProductCount={handlerUpdateProducts}
                index={index}
            />
        </div>
    );
}

export default Card;
