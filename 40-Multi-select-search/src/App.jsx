import React, { useEffect, useRef, useState } from 'react'
import { Hello } from './Components/Hello'
import Pills from './Components/Pills'

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedUserSet, setSelectedUserSet] = useState(new Set())
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.trim() === '') {
        setSuggestions([])
        setActiveSuggestion(0)
        setIsLoading(false)
        setIsLoading(false)
        setHasSearched(false)
        return
      }

      setIsLoading(true)
      setHasSearched(true)
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://dummyjson.com/users/search?q=${searchTerm}`
        )
        const data = await response.json()
        setSuggestions(data.users || [])
        setActiveSuggestion(0)
      } catch (err) {
        console.error(err)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchUsers, 300)
    return () => clearTimeout(debounceTimer)
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

  const clearAllUsers = () => {
    setSelectedUsers([])
    setSelectedUserSet(new Set())
    setSuggestions([])
    setSearchTerm('')
    inputRef.current.focus()
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
      e.preventDefault()
      const userToSelect = suggestions[activeSuggestion]
      if (!selectedUserSet.has(userToSelect.email)) {
        handleSelectUser(userToSelect)
      }
    } else if (e.key === 'Escape') {
      setSuggestions([])
      setSearchTerm('')
    }
  }

  return (
    <div className="app">
      {/* App Header */}
      <div className="app-header">
        <h1 className="app-title">Multi-Select User Search</h1>
        <p className="app-description">
          Search and select multiple users. Use arrow keys for navigation and
          backspace to clear.
        </p>
      </div>

      {/* <Hello/> */}

      <div className="user-search-container">
        <div className="search-header">
          <h2>Select Users</h2>
          {selectedUsers.length > 0 && (
            <button className="clear-all-btn" onClick={clearAllUsers}>
              Clear All ({selectedUsers.length})
            </button>
          )}
        </div>

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

          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              name=""
              id=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a user..."
              onKeyDown={handleKeyDown}
              className="search-input"
            />

            {isLoading && <div className="loading-spinner"></div>}

            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((user, index) => {
                  return !selectedUserSet.has(user.email) ? (
                    <li
                      key={user.email}
                      onClick={() => handleSelectUser(user)}
                      className={
                        index === activeSuggestion
                          ? 'suggestion-item active-suggestion'
                          : 'suggestion-item'
                      }
                    >
                      <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="user-avatar"
                      />
                      <div className="user-info">
                        <span className="user-name">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </li>
                  ) : null
                })}
              </ul>
            )}

            {hasSearched &&
              !isLoading &&
              searchTerm.trim() !== '' &&
              suggestions.length === 0 && (
                <div className="no-results">
                  No users found for "{searchTerm}"
                </div>
              )}
          </div>
        </div>

        {selectedUsers.length > 0 && (
          <div className="selected-summary">
            <h3>Selected Users ({selectedUsers.length})</h3>
            <div className="selected-users-grid">
              {selectedUsers.map((user) => (
                <div key={user.email} className="selected-user-card">
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="card-avatar"
                  />
                  <div className="card-info">
                    <span className="card-name">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="card-email">{user.email}</span>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveUser(user)}
                    title="Remove user"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
