import {
  useRef,
  useCallback,
  memo,
  forwardRef
} from 'react'

import { useMode } from '../context/ModeContext'
import useProfileFilter from '../hooks/useProfileFilter'
import useCardCount from '../hooks/useCardCount'
import '../App.css'
import styles from '../Header.module.css'

const Header = memo(function Header({ mode }) {
  const title = "Favour's Profile";
  const subtitle = "Lab 14: Custom Hooks";

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

  const {
    state,
    filteredCards,
    handleTitleChange,
    handleSearchChange,
    handleReset
  } = useProfileFilter()

  const {
    sectionRef,
    cardCount
  } = useCardCount(filteredCards)

  const searchRef = useRef(null)

  const handleFocus = useCallback(() => {
    searchRef.current.focus()
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