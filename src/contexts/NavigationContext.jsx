import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [selectedItens, setSelectedItens] = useState([])
  const [indeterminateItens, setIndeterminateItens] = useState([])
  const [selectedFathers, setSelectedFathers] = useState([])


  return (
    <AuthContext.Provider
      value={{
        selectedItens,
        setSelectedItens,
        indeterminateItens,
        setIndeterminateItens,
        selectedFathers,
        setSelectedFathers,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
