/* eslint-disable react/prop-types */
export default function ErrorInputForm({ error }) {
  return (
    error && <p className="text-red-default text-[1rem] italic">{error}</p>
  );
}
