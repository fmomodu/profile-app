import {
  useState,
  useReducer,
  useRef,
  useLayoutEffect,
  useMemo,
  useCallback,
  memo,
  forwardRef
} from 'react'

import { useMode } from '../context/ModeContext'
import '../App.css'
import styles from '../Header.module.css'

const Header = memo(function Header({ mode }) {
  const title = "Favour's Profile";
  const subtitle = "Lab 13: Performance Optimization";

  return (
    <header className={`${styles.header} ${mode === "light" ? styles.light : styles.dark}`}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
})

const Introduction = memo(function Introduction() {
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
})

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

  const cards = useMemo(() => [
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
  ], [])

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesTitle =
        state.selectedTitle === "" || card.title === state.selectedTitle

      const matchesSearch =
        state.searchName === "" ||
        card.name.toLowerCase().includes(state.searchName.toLowerCase())

      return matchesTitle && matchesSearch
    })
  }, [cards, state.selectedTitle, state.searchName])

  useLayoutEffect(() => {
    if (sectionRef.current) {
      setCardCount(sectionRef.current.children.length)
    }
  }, [filteredCards])

  const handleTitleChange = useCallback((e) => {
    dispatch({ type: "SET_TITLE", value: e.target.value })
  }, [])

  const handleSearchChange = useCallback((e) => {
    dispatch({ type: "SET_SEARCH", value: e.target.value })
  }, [])

  const handleFocus = useCallback(() => {
    searchRef.current.focus()
  }, [])

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" })
  }, [])

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
        onChange={handleTitleChange}
      >
        <option value="">All</option>
        <option value="Student">Student</option>
        <option value="Professor">Professor</option>
        <option value="Faculty">Faculty</option>
      </select>

      <input
        ref={searchRef}
        value={state.searchName}
        onChange={handleSearchChange}
        placeholder="Search by name"
      />

      <button onClick={handleFocus}>
        Focus
      </button>

      <button onClick={handleReset}>
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

const Section = memo(forwardRef(function Section({ children }, ref) {
  return <section ref={ref}>{children}</section>
}))

const Card = memo(function Card({ name, title, year, major, isFeatured }) {
  return (
    <div className={isFeatured ? "card featured" : "card"}>
      <h3>{name}</h3>
      <p>{title}</p>
      <p>{year}</p>
      <p>{major}</p>
    </div>
  )
})

export default Home