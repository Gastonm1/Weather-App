import React from "react";

const Header = ({location, city}) => {
  return (
    <div className="Header">
      <h3>{location}</h3>
      <h3>Timezone: {city}</h3>

    </div>
  );
};

export default Header;