import React, { useEffect, useState } from "react";

function HeaderApp() {
  return (
    <header className="header-app">
      <img className="header-app--logo" src="logo.png" alt="Logo" />
      My-shop aplication
    </header>
  );
}

function ProductList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://private-1c19e-reactlesson.apiary-mock.com/products")
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((err) => console.log(err));
  }, []);

  function AddToCart({ inStock }) {
    return inStock ? (
      <button>Dodaj do koszyka</button>
    ) : (
      <button disabled>Dodaj do koszyka</button>
    );
  }

  return (
    <section className="product-list">
      {/* tutaj ma byc search bar */}

      {records
        .filter((x) => x.id <= 5)
        .map((x) => (
          <div className="product-box">
            <div>
              <img className="product-box--image" src={x.photo}></img>
            </div>
            <div>
              <h2>{x.name}</h2>
              <pre>Cena: {x.price}zł</pre>
              <p>{x.description}</p>
              <AddToCart inStock={x.in_stock} />
            </div>
          </div>
        ))}
    </section>
  );
}

function Footer() {
  return <footer className="footer">Copyright by my-shop - 2018</footer>;
}

function Cart() {
  return (
    <>
      <section className="user-cart">
        <h4>Twój koszyk</h4>
        <ul className="user-cart--list"></ul>
        <section className="total-price">Podsumowanie:</section>
      </section>
    </>
  );
}

function App() {
  return (
    <>
      <HeaderApp />
      <div className="container">
        <ProductList />
        <Cart />
      </div>
      <Footer />
    </>
  );
}

export default App;
