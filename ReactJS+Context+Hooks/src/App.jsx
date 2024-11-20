import React, { useEffect, useState } from 'react';

function HeaderApp() {
  return (
    <header className="header-app">
    <img className="header-app--logo" src="logo.png" alt="Logo"/>
    My-shop aplication
    </header>
  );
}

function Products(){

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('http://private-1c19e-reactlesson.apiary-mock.com/products')
    .then(response => response.json())
    .then(data => setRecords( data))
    .catch(err => console.log(err))
  }, [])

  return(
      <>
        {records.filter(x => x.id <= 5).map(x =>
          <div className='product-box'>
          <div><img className='product-box--image' src={x.photo}></img></div>
          <div>
            <h2>{x.name}</h2>
            <pre>Cena: {x.price}zł</pre>
            <p>{x.description}</p>
            <button>Dodaj do koszyka</button>

          </div>
          </div>
        )}
</>
      

  )

}

function App(){
  return(
    <>
    <HeaderApp />
    <Products />
    </>
  )
}

  
export default App;
