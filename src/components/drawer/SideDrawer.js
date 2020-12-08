import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.png";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  //const [visible, setVisible] = useState(false);

  const handleCloseDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };

  const imageStyle = {
    width: "100px",
    height: "50px",
    objectFit: "cover",
  };

  return (
    <Drawer
      className="text-center"
      title={`Panier / ${cart.length} produits`}
      visible={drawer}
      onClose={handleCloseDrawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} alt={p.title} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={laptop} style={imageStyle} alt={p.title} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={handleCloseDrawer}
          className="text-center btn btn-primary btn-raised btn-block"
        >
          Panier
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
