import "./cards.css";

function CardCheckout({ item }) {
    return (
        <div className="card">
            <div>{item.title}</div>
            <img
                width={"100px"}
                src={item.image}
                alt={`Image of: ${item.title}`}
            />
            <div>Items: {item.count}</div>
        </div>
    );
}

export default CardCheckout;
