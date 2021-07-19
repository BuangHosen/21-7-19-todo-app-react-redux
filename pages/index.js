import React from "react";
import withAuthGuard from "~/components/material/withAuthGuard";

import Login from "./login";

export default withAuthGuard(function Home() {
  return (
    <div>
      <Login />
    </div>
  );
});
