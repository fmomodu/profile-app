import './App.css'

function Header() {
  const title = "Favour's Profile";
  const subtitle = "Lab 3: Multiple Components:";

  return ( <header> 
   <h1>{title}</h1>
   <h2>{subtitle}</h2>
   </header>
  );
}

function Introduction() {
  const name = "Favour";
  const bio = "blah blah blah";
  const email = "fmomodu@purdue.edu";

  return (
    <section> 
      <h2>{name}</h2>
      <p>{bio}</p>
      <p>{email}</p>
    </section>
  );
}

function App() {
  return (
    <div> 
      <Header />
      <Introduction />
      <Card />
      <Card />
    </div>
  );
}

function Card() {
  const cardTitle = "My Card";
  const cardText = "Some info";
  const featured = true;
  


  return (
      <div className={featured ? "card featured" : "card"}>
      <h3>{cardTitle}</h3>
      <p>{cardText}</p>
      </div> 
  );
}
export default App;

