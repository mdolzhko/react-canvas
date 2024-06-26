const styles =
  "peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300";

interface Props {
  handler: () => void;
}

const Toggle = ({ handler }: Props) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        id="switch"
        type="checkbox"
        onChange={handler}
        className="peer sr-only"
      />
      <label htmlFor="switch" className="hidden" />
      <div className={styles} />
      <span className="px-4">Line mode</span>
    </label>
  );
};

export default Toggle;
