import React, { useState, useEffect, useContext } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { AuthContext } from '../../contexts/NavigationContext.jsx'

import './styles.css'

const Collapsible = ({ name, dependents, id: idPerson, idPai, idAncestrais }) => {
  const {
    selectedItens,
    setSelectedItens,
    indeterminateItens,
    setIndeterminateItens,
    selectedFathers,
    setSelectedFathers,
  } = useContext(AuthContext)

  const [abrirCollapsible, setAbrirCollapsible] = useState(false)
  const [checkboxSelecionado, setCheckboxSelecionado] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [isIndeterminate, setIsIndeterminate] = useState(false)
  const [family, setFamily] = useState([])
  const [createdCollapsible, setCreatedCollapsible] = useState({})

  useEffect(() => {
    setFamily(Object.values(dependents))
  }, [dependents])

  console.log('Fathers', selectedFathers)
  console.log('Itens', selectedItens)

  useEffect(() => {
    if (
      selectedFathers?.some((item) => item === idPai) &&
      !selectedItens.some((item) => item === idPerson)
    ) {
      setSelectedItens([...selectedItens, idPerson])
      if (family.length > 0) {
        setSelectedFathers([...selectedFathers, idPerson])
      }
    } else if (
      !selectedFathers?.some((item) => item === idPai) &&
      selectedItens.some((item) => item === idPerson && !isSelected)
    ) {
      setSelectedItens(selectedItens?.filter((item) => item !== idPerson))
      if (family.length > 0) {
        setSelectedFathers(selectedFathers?.filter((item) => item !== idPerson))
      }
    }

    setCreatedCollapsible(
      family?.map(({ name, children, id }) => {
        return (
          <Collapsible
            name={name}
            dependents={children}
            id={id}
            key={id}
            idAncestrais={[...idAncestrais, id]}
            idPai={idPerson}
          />
        )
      })
    )
  }, [family, family.length, idAncestrais, idPai, idPerson, isSelected, selectedFathers, selectedItens, setSelectedFathers, setSelectedItens])

  useEffect(() => {
    if (selectedItens.some((item) => item === idPerson)) {
      setCheckboxSelecionado(true)
    } else {
      setCheckboxSelecionado(false)
    }
  }, [selectedItens, idPerson, selectedFathers])

  const handleRemoveIdFromSelectedItens = () => {
    const newArray = selectedItens?.filter((item) => item !== idPerson)
    setSelectedItens(newArray)
  }

  const handleTogglePanel = () => {
    setAbrirCollapsible(!abrirCollapsible)
  }

  const handleRemoveIdFromSelectedFathers = () => {
    const newArray = selectedFathers?.filter((item) => item !== idPerson)
    if (newArray?.length > 0) {
      setSelectedFathers(newArray)
    }
  }

  const handleClickCheckbox = () => {
    if (checkboxSelecionado) {
      handleRemoveIdFromSelectedItens()
      handleRemoveIdFromSelectedFathers()
      setIsSelected(false)
    } else {
      setSelectedItens([...selectedItens, idPerson])
      setIsSelected(true)
      if (family.length > 0) {
        setSelectedFathers([...selectedFathers, idPerson])
      }
    }
  }

  return (
    <div key={idPerson}>
      <div onClick={() => {}} className="header">
        <button value={checkboxSelecionado} onClick={handleClickCheckbox}>
          {checkboxSelecionado ? 'Selecionado' : 'Não selecionado'}
        </button>
        {name}
        {family?.length > 0 && (
          <>
            {abrirCollapsible ? (
              <FaChevronUp value={abrirCollapsible} onClick={handleTogglePanel} />
            ) : (
              <FaChevronDown value={abrirCollapsible} onClick={handleTogglePanel} />
            )}
          </>
        )}
      </div>
      {abrirCollapsible && family?.length > 0 && (
        <div className="content">{createdCollapsible}</div>
      )}
    </div>
  )
}

export default Collapsible
