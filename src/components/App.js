import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import PackingList from "./PackingList";
import Footer from "./Footer";

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

  function handleClearItems() {
    const confrimed = window.confirm(
      "Are you sure you want to delete all items on the list"
    );
    if (confrimed) setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onItemDelete={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Footer items={items} />
    </div>
  );
}
