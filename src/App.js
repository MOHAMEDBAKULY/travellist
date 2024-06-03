import { useState } from "react";

const listOfItems = [
  { id: 1, description: "Kanzu", quantity: 5, packed: true },
  { id: 2, description: "Trousers", quantity: 4, packed: false },
  { id: 3, description: "Kikoi", quantity: 3, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Header />
      <Form />
      <PackingList />
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

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    console.log(newItem);

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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {listOfItems.map((item) => (
          <Item items={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ items }) {
  return (
    <li>
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.quantity} {items.description}
      </span>
      <button>❌</button>
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
