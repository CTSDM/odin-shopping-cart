import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { elementsNavBar, maxItemsCart } from "../../config/config.js";
import styles from "./NavigationBar.module.css";
import deltaSigma from "../assets/delta-sigma.svg";

function NavigationBar({ totalItems }) {
    return (
        <div role={"nav-container"} className={styles.bar}>
            <div>
                <NavLink to={"/"}>
                    <img src={deltaSigma} alt="company logo" />
                </NavLink>
            </div>
            <nav>
                {Object.entries(elementsNavBar).map(([key, value]) => {
                    return (
                        <Fragment key={key}>
                            <NavLink to={value} key={key}>
                                {key}
                            </NavLink>
                            {value === "cart" ? (
                                <>
                                    <span
                                        role="cart-count"
                                        className={styles["total-items"]}
                                    >
                                        {totalItems > maxItemsCart
                                            ? "+" + maxItemsCart
                                            : totalItems}
                                    </span>
                                </>
                            ) : null}
                        </Fragment>
                    );
                })}
            </nav>
        </div>
    );
}

NavigationBar.propTypes = {
    totalItems: PropTypes.number,
};

export default NavigationBar;
