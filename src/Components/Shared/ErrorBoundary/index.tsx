import React from "react";
import { ErrorMessage } from "./ErrorMessage";

interface ErrorBoundaryProps {}
interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? <ErrorMessage /> : this.props.children;
  }
}
