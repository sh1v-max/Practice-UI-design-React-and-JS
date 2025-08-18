import React, { useEffect, useRef, useState } from 'react'
import { Hello } from './Components/Hello'
import Pills from './Components/Pills'

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedUserSet, setSelectedUserSet] = useState(new Set())
  const [activeSuggestion, setActiveSuggestion] = useState(0)

  const inputRef = useRef(null)

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === '') {
        setSuggestions([])
        setActiveSuggestion(0) // reset highlight when input clears
        return
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.users)
          setActiveSuggestion(0) // reset highlight on new results
        })
        .catch((err) => {
          console.error(err)
        })
    }

    fetchUsers()
  }, [searchTerm])

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user])
    setSelectedUserSet(new Set([...selectedUserSet, user.email]))
    setSearchTerm('')
    setSuggestions([])
    inputRef.current.focus()
  }

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    )
    setSelectedUsers(updatedUsers)

    const updatedEmails = new Set(selectedUserSet)
    updatedEmails.delete(user.email)
    setSelectedUserSet(updatedEmails)
  }

  const handleKeyDown = (e) => {
    if (
      e.key === 'Backspace' &&
      e.target.value === '' &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1]
      handleRemoveUser(lastUser)
      setSuggestions([])
    } else if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault()
      setActiveSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp' && suggestions.length > 0) {
      e.preventDefault()
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (
      e.key === 'Enter' &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.length
    ) {
      handleSelectUser(suggestions[activeSuggestion])
    }
  }

  return (
    <div className="app">
      {/* <Hello/> */}
      <div className="user-search-container">
        <div className="user-search-input">
          {/* pills */}
          {selectedUsers.map((user) => {
            return (
              <Pills
                key={user.email}
                image={user.image}
                text={`${user.firstName} ${user.lastName}`}
                onClick={() => handleRemoveUser(user)}
              />
            )
          })}
          <div>
            <input
              ref={inputRef}
              type="text"
              name=""
              id=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a user..."
              onKeyDown={handleKeyDown}
            />
            {/* search suggestions */}
            <ul className="suggestions-list">
              {suggestions?.map((user, index) => {
                return !selectedUserSet.has(user.email) ? (
                  <li
                    key={user.email}
                    onClick={() => handleSelectUser(user)}
                    className={
                      index === activeSuggestion ? 'active-suggestion' : ''
                    }
                  >
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                ) : (
                  <div key={user.email}></div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
