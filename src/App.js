import { useState } from "react";

// const listOfItems = [
//   { id: 1, description: "Kanzu", quantity: 5, packed: true },
//   { id: 2, description: "Trousers", quantity: 4, packed: false },
//   { id: 3, description: "Kikoi", quantity: 3, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onItemDelete={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Footer items={items} />
    </div>
  );
}

function Header() {
  return (
    <div className="header-box">
      <span className="logo">A Trip with the Boys</span>
      <img src="Minions.jpeg" alt="Pic of minions" />
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Let's plan your packing list</h3>
      <select
        className="choose"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Your Travel List ?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="button">Add Item</button>
    </form>
  );
}

function PackingList({ items, onItemDelete, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onItemDelete={onItemDelete}
            key={item.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onItemDelete, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onItemDelete(item.id)}>❌</button>
    </li>
  );
}

function Footer({ items }) {
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
