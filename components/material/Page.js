import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Page = forwardRef(({ children, ...rest }, ref) => {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired
};

Page.displayName = "Page";

export default Page;
