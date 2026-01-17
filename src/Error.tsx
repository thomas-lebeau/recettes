interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return <div className="error">{message}</div>;
}
