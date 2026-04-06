import { useState } from 'react'
import './App.css'

function Header() {
  const title = "Favour's Profile";
  const subtitle = "Lab 5: ";

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
  // <select value={selectedTitle} onChange={(e) => setTitle(e.target.value)}>
  // <input value={searchName} onChange={(e) => setName(e.target.value)} />

  
  // const [name , setName ]
  const [selectedTitle, setTitle ] = useState(""); //dropdown
  const [searchName, setName ] = useState(""); //search
  const cards = [
    {
      id: 1,
      name: "Favour", 
      title: "Student",
      year: "Senior", 
      major: "IT", 
      isFeatured: true
    },
    {
      id: 2,
      name: "Ngozi", 
      title: "Professor",
      year: "Junior", 
      major: "Cybersecurity", 
      isFeatured: false
    }
  ]

  const filteredCards = cards.filter((card) => {
    const matchesTitle = 
    selectedTitle === "" || card.title === selectedTitle;

    const matchesSearch = 
    searchName === "" ||
    card.name.toLowerCase().includes(searchName.toLowerCase());
    return matchesTitle && matchesSearch;
  });
  


  // array.map((item) => (
  // <Component prop={item.prop} /> ))
  return (
    <div> 
      <Header />
      <Introduction />
      <select value={selectedTitle} onChange={(e) => setTitle(e.target.value)}>
        <option value="">All</option>
        <option value= "Student">Student</option>
        <option value="Professor">Professor</option>
        <option value="Faculty">Faculty</option>
        </select>

      <input 
        value={searchName} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Search by name"
        />

      <button onClick={() => {
        setName("");
        setTitle("");
      }}>
        Reset
        </button>  


      <Section>
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            title={card.title}
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
// return <p>{thing1}</p> }
function Card({name,title, year, major, isFeatured}) {
  return (
    // condition ? "if true" : "if false"
    // with {variable}, without is text 
    <div className={isFeatured? "card featured" : "card"}> 
      <h3>{name}</h3>  
      <p>{title}</p>
      <p>{year}</p>
      <p>{major}</p> 
    </div>
  )

}
export default App;

