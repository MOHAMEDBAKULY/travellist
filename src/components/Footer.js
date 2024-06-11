export default function Footer({ items }) {
  if (!items.length) {
    return (
      <p className="footer">
        <em>Start packing for your trip 😎 </em>
      </p>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((items) => items.packed).length;
  const perntage = Math.round((numPacked / numItems) * 100);

  return (
    <div className="footer">
      <em>
        {perntage === 100
          ? "✔✔ Everything is ready call the boys ✔✔"
          : `You have ${numItems} number of items on your list, and you have already
        packed ${numPacked} (${perntage}%) items`}
      </em>
    </div>
  );
}
