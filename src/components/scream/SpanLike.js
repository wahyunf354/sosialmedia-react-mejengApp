import React from "react";
import PropTypes from "prop-types";
// MUI Stuff
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";


function SpanLike(props) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const { likeCount } = props;
  return (
    <span>{ likeCount } { isDesktop ? "Like" : "" }</span>
  );
}

SpanLike.propTypes = {
  likeCount: PropTypes.number.isRequired
};

export default SpanLike;