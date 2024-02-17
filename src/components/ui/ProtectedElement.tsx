interface IProps {
  children?: React.ReactNode;
  isAllowed: boolean;
}

function ProtectedElement({
  children,
  isAllowed,
}: IProps): React.ReactNode | undefined {
  return isAllowed ? children : undefined;
}

export default ProtectedElement;
