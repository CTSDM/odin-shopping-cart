import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import deltaSigma from "../../public/delta-sigma.svg";
import { elementsNavBar, maxItemsCart } from "../../config/config.js";

function NavigationBar({ totalItems }) {
    return (
        <div className={styles.bar}>
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
                                    <span className={styles["total-items"]}>
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

export default NavigationBar;
