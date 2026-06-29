import { useReducer, useMemo, useCallback } from 'react'

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

function useProfileFilter() {
  const [state, dispatch] = useReducer(reducer, initialState)

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

  const handleTitleChange = useCallback((e) => {
    dispatch({ type: "SET_TITLE", value: e.target.value })
  }, [])

  const handleSearchChange = useCallback((e) => {
    dispatch({ type: "SET_SEARCH", value: e.target.value })
  }, [])

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" })
  }, [])

  return {
    state,
    filteredCards,
    handleTitleChange,
    handleSearchChange,
    handleReset
  }
}

export default useProfileFilter