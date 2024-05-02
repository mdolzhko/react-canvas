const styles =
  "rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

interface Props {
  label: string;
  handler: () => void;
}

const Button = ({ label, handler }: Props) => {
  return (
    <button onClick={handler} className={styles}>
      {label}
    </button>
  );
};

export default Button;
