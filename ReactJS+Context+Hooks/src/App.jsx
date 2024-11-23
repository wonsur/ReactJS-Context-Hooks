import React, { useEffect, useState } from "react";

function HeaderApp() {
  return (
    <header className="header-app">
      <img className="header-app--logo" src="logo.png" alt="Logo" />
      My-shop application
    </header>
  );
}

function ProductList({ cart, setCart }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://private-1c19e-reactlesson.apiary-mock.com/products")
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((err) => console.log(err));
  }, []);

  function handleAddToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  function AddToCart({ product, inStock }) {
    return inStock ? (
      <button onClick={() => handleAddToCart(product)}>Dodaj do koszyka</button>
    ) : (
      <button disabled>Dodaj do koszyka</button>
    );
  }

  function Search() {
    return (
      <>
        <div className="search">
          <input type="text" className="search-input" placeholder="Szukaj..." />
        </div>
      </>
    );
  }

  return (
    <section className="product-list">
      <Search />
      {records
        .filter((x) => x.id <= 5)
        .map((x, index) => (
          <div key={index} className="product-box">
            <div>
              <img className="product-box--image" src={x.photo}></img>
            </div>
            <div>
              <h2>{x.name}</h2>
              <pre>Cena: {x.price}zł</pre>
              <p>{x.description}</p>
              <AddToCart product={x} inStock={x.in_stock} />
            </div>
          </div>
        ))}
    </section>
  );
}

function Cart({ cart, setCart }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  function handleRemove(index) {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  }

  return (
    <>
      <section className="user-cart">
        <h4>Twój koszyk</h4>
        {cart.length === 0 ? (
          <p>Koszyk jest pusty</p>
        ) : (
          <ul className="user-cart--list">
            {cart.map((item, index) => (
              <li key={index} className="user-cart--list">
                <button onClick={() => handleRemove(index)}>X</button>
                {item.name} - {item.price}zł
              </li>
            ))}
          </ul>
        )}
        <section className="total-price">Podsumowanie: {totalPrice}zł</section>
      </section>
    </>
  );
}

function Footer() {
  return <footer className="footer">Copyright by my-shop - 2018</footer>;
}

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <HeaderApp />
      <div className="container">
        <ProductList cart={cart} setCart={setCart} />
        <Cart cart={cart} setCart={setCart} />
      </div>
      <Footer />
    </>
  );
}

export default App;
