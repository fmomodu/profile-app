import './App.css'

function Header() {
  const title = "Favour's Profile";
  const subtitle = "Lab 4: Props and Children:";

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
  const cards = [
    {
      id: 1,
      name: "Favour", 
      year: "Senior", 
      major: "IT", 
      isFeatured: true
    },
    {
      id: 2,
      name: "Ngozi", 
      year: "Junior", 
      major: "Cybersecurity", 
      isFeatured: false
    }
  ]
  // array.map((item) => (
  // <Component prop={item.prop} />
// ))

// key={card.id}
  return (
    <div> 
      <Header />
      <Introduction />
      <Section>
          {cards.map((card) => (
  <Card
    key={card.id}
    name={card.name}
    year={card.year}
    major={card.major}
    isFeatured={card.isFeatured}
  />
))}
      </Section>
    
    </div>
  );
}
function Section({ children}) {
    return (
      <section>
        {children}
      </section>
    )
  }
  

// function Component({ thing1, thing2 }) {
// return <p>{thing1}</p>
// }
function Card({name, year, major, isFeatured}) {
  return (
    // condition ? "if true" : "if false"
    // with {variable}, without is text 
    <div className={isFeatured? "card featured" : "card"}> 
      <h3>{name}</h3>  
      <p>{year}</p>
      <p>{major}</p> 
    </div>
  )

}
export default App;

