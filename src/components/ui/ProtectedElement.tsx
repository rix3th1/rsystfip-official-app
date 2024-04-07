interface IProps {
  children: React.ReactNode;
  isAllowed: boolean;
}

function ProtectedElement({ children, isAllowed }: IProps): React.ReactNode {
  return isAllowed ? children : null;
}

export default ProtectedElement;
