/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
export default function InfosEvent({
  eventToDisplay: { e_private, title, description, start, end },
  formatDate,
}) {
  return (
    <section name="infos-event" className="mt-4">
      <label
        className={
          e_private
            ? "bg-blue-default w-fit px-2 rounded-lg text-cream"
            : "bg-blue-medium w-fit px-2 rounded-lg text-cream"
        }
      >
        {e_private ? "Personnel" : "Groupe"}
      </label>

      <h2 className="text-xl mt-1 font-bold">{title}</h2>
      <p className="border-b-[1px] border-bluedefault mb-2 pb-2">
        {formatDate(start, end)}
      </p>
      <p>{description}</p>
    </section>
  );
}
