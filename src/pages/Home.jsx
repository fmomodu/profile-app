import {
  useState,
  useReducer,
  useRef,
  useLayoutEffect
} from 'react'

import { useMode } from '../context/ModeContext'
import '../App.css'
import styles from '../Header.module.css'

function Header({ mode }) {
  const title = "Favour's Profile";
  const subtitle = "Lab 12: Scaling State Management in Your Application";

  return (
    <header className={`${styles.header} ${mode === "light" ? styles.light : styles.dark}`}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
}

function Introduction() {
  const name = "Favour";
  const bio = "Web Programming Student at Purdue University";
  const email = "fmomodu@purdue.edu";

  return (
    <section>
      <h2>{name}</h2>
      <p>{bio}</p>
      <p>{email}</p>
    </section>
  );
}

function Home() {
  const { mode, toggleMode } = useMode()

  const initialState = {
    selectedTitle: "",
    searchName: ""
  }

  function reducer(state, action) {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, selectedTitle: action.value }

      case "SET_SEARCH":
        return { ...state, searchName: action.value }

      case "RESET":
        return initialState

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const searchRef = useRef(null)
  const sectionRef = useRef(null)

  const [cardCount, setCardCount] = useState(0)

  useLayoutEffect(() => {
    if (sectionRef.current) {
      setCardCount(sectionRef.current.children.length)
    }
  }, [state.selectedTitle, state.searchName])

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
      state.selectedTitle === "" || card.title === state.selectedTitle

    const matchesSearch =
      state.searchName === "" ||
      card.name.toLowerCase().includes(state.searchName.toLowerCase())

    return matchesTitle && matchesSearch
  })

  return (
    <div className={`home-page ${mode === "light" ? "home-light" : "home-dark"}`}>
      <Header mode={mode} />
      <Introduction />

      <button onClick={toggleMode}>
        {mode === "light" ? "☀️" : "🌚"}
      </button>

      <p>
        {mode === "light" ? "Light Mode Active" : "Dark Mode Active"}
      </p>

      <p>Showing {cardCount} profiles</p>

      <select
        value={state.selectedTitle}
        onChange={(e) =>
          dispatch({ type: "SET_TITLE", value: e.target.value })
        }
      >
        <option value="">All</option>
        <option value="Student">Student</option>
        <option value="Professor">Professor</option>
        <option value="Faculty">Faculty</option>
      </select>

      <input
        ref={searchRef}
        value={state.searchName}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH", value: e.target.value })
        }
        placeholder="Search by name"
      />

      <button onClick={() => searchRef.current.focus()}>
        Focus
      </button>

      <button onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>

      <Section ref={sectionRef}>
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

import { forwardRef } from 'react'

const Section = forwardRef(function Section({ children }, ref) {
  return <section ref={ref}>{children}</section>
})

function Card({ name, title, year, major, isFeatured }) {
  return (
    <div className={isFeatured ? "card featured" : "card"}>
      <h3>{name}</h3>
      <p>{title}</p>
      <p>{year}</p>
      <p>{major}</p>
    </div>
  )
}

export default Home