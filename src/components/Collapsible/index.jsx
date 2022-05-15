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
  const [family, setFamily] = useState([])
  const [createdCollapsible, setCreatedCollapsible] = useState({})

  const [objectToHelp, setObjectToHelp] = useState({})

  useEffect(() => {
    setFamily(Object.values(dependents))
  }, [dependents])

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

  console.log('Fathers', selectedFathers)
  console.log('Itens', selectedItens)

  // useEffect(() => {
    // if (selectedItens.some((item) => item === idPerson)) {
    //   if (family.length > 0) {
    //     family.map((child) => setSelectedItens([...new Set([...selectedItens, child.id])]))
    //     setSelectedFathers([...new Set([...selectedFathers, idPerson])])
    //   }
    // } else if (
    //   (!selectedItens.some((item) => item === idPerson) &&
    //     !selectedFathers?.some((item) => item === idPerson)) ||
    //   !selectedItens.some((item) => item === idPerson)
    // ) {
    //   if (family.length > 0) {
    //     const elementsToDelet = new Set(family)
    //     setSelectedItens(
    //       selectedItens.filter((item) => {
    //         return !elementsToDelet.has(item)
    //       })
    //     )
    //   }
    // }

    // if (
    //   selectedFathers?.some((item) => item === idPai) &&
    //   !selectedItens.some((item) => item === idPerson) &&
    //   isSelected
    // ) {
    //   setSelectedItens(selectedItens?.filter((item) => item !== idPerson))
    //   if (family.length > 0) {
    //     setSelectedFathers([...new Set(selectedFathers?.filter((item) => item !== idPerson))])
    //   }
    // } else if (
    //   selectedFathers?.some((item) => item === idPai) &&
    //   !selectedItens.some((item) => item === idPerson)
    // ) {
    //   setSelectedItens([...selectedItens, idPerson])
    //   if (family.length > 0) {
    //     setSelectedFathers([...new Set([...selectedFathers, idPerson])])
    //   }
    // } else if (
    //   !selectedFathers?.some((item) => item === idPai) &&
    //   selectedItens.some((item) => item === idPerson && !isSelected)
    // ) {
    //   setSelectedItens(selectedItens?.filter((item) => item !== idPerson))
    //   if (family.length > 0) {
    //     setSelectedFathers([...new Set(selectedFathers?.filter((item) => item !== idPerson))])
    //   }
    // }

  //   setCreatedCollapsible(
  //     family?.map(({ name, children, id }) => {
  //       return (
  //         <Collapsible
  //           name={name}
  //           dependents={children}
  //           id={id}
  //           key={id}
  //           idAncestrais={[...idAncestrais, id]}
  //           idPai={idPerson}
  //         />
  //       )
  //     })
  //   )
  // }, [
  //   family,
  //   family.length,
  //   idAncestrais,
  //   idPai,
  //   idPerson,
  // ])

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
      setSelectedFathers([...new Set(newArray)])
    }
  }

  const handleValidate = (idRef) => {
    if (selectedItens.some((item) => item === idRef)) {
      console.log('Esse é o idRef')
      if (family.length > 0) {
        console.log('Entrou na familia')
        family.map(
          (child) => {
            setSelectedItens([...selectedItens, child.id])
            console.log('Entrou dentro do map')
            handleValidate(child.id)
            return ''
          }
        )
        setSelectedFathers([...selectedFathers, idPerson])
      }
    } else if (
      (!selectedItens.some((item) => item === idPerson) &&
        !selectedFathers?.some((item) => item === idPerson)) ||
      !selectedItens.some((item) => item === idPerson)
    ) {
      if (family.length > 0) {
        const elementsToDelet = new Set(family)
        setSelectedItens(
          selectedItens.filter((item) => {
            return !elementsToDelet.has(item)
          })
        )
        setSelectedFathers(
          selectedFathers.filter((item) => {
            return !elementsToDelet.has(item)
          })
        )
        family.map((element) => handleValidate(element.id))
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
  }

  const handleClickCheckbox = () => {
    if (checkboxSelecionado) {
      handleRemoveIdFromSelectedFathers()
      handleRemoveIdFromSelectedItens()
    } else {
      setSelectedItens([...selectedItens, idPerson])
      // if (family.length > 0) {
      //   family.map(child => setSelectedItens([...selectedItens, child.id]))
      //   setSelectedFathers([...new Set([...selectedFathers, idPerson])])
      // }
    }
    handleValidate(idPerson)
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
