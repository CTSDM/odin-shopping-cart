import { NavLink } from "react-router-dom";
const elementsNavBar = { home: "/", shop: "shop/", cart: "cart" };

function NavigationBar({ totalItems }) {
    // the shopping cart should have a number that shows how many items
    // are currently in the cart
    return (
        <nav>
            {Object.entries(elementsNavBar).map(([key, value]) => {
                return (
                    <NavLink to={value} key={key}>
                        {value === "cart" ? `${key} ${totalItems}` : key}
                    </NavLink>
                );
            })}
        </nav>
    );
}

export default NavigationBar;
