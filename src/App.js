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

  return (
    <div className="app">
      <Header />
      <Form onAddItems={handleAddItem} />
      <PackingList items={items} onItemDelete={handleDeleteItem} />
      <Footer />
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

function PackingList({ items, onItemDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onItemDelete={onItemDelete} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onItemDelete }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => {}} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onItemDelete(item.id)}>❌</button>
    </li>
  );
}

function Footer() {
  return (
    <div className="footer">
      <em>
        You have X number of items on your list, and you have already packed
        (X%) items
      </em>
    </div>
  );
}
