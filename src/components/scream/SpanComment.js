import React from "react";
import PropTypes from "prop-types";
// MUI Stuff
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";


function SpanLike(props) {  
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const { commentCount } = props;
  return (
    <span>{ commentCount } { isDesktop ? "Comment" : "" }</span>
  );
}

SpanLike.propTypes = {
  commentCount: PropTypes.number.isRequired
};

export default SpanLike;