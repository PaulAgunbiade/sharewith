import React, {useState} from "react";
import {Loader} from "./Loader";

export default function LoadingHOC(
  WrappedComponent: React.FC,
  initialLoadingState: boolean = true,
  type?: "white" | "color"
) {
  function HOC() {
    const [isLoading, setLoading] = useState(initialLoadingState);

    return isLoading ? <Loader type={type} /> : <WrappedComponent />;
  }

  return HOC;
}
