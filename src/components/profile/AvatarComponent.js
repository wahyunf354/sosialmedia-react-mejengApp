import React from "react";
import propTypes from "prop-types";

const AvatarComponent = ({ imageUrl }) => (
  <img src={imageUrl} alt="Profile" className="profile-image" />
);

AvatarComponent.propTypes = {
  imageUrl: propTypes.string.isRequired,
};

export default AvatarComponent;
