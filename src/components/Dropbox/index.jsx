import React, { useState, useEffect } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

import './styles.css'

const Dropbox = ({ name, dependents, id, idPai, selectedItens, manageSelectedItens }) => {

  const [abrirCollapsible, setAbrirCollapsible] = useState(false)
  const [checkboxSelecionado, setCheckboxSelecionado] = useState(false)
  const [filhos, setFilhos] = useState([])

  useEffect(() => {
    setFilhos(Object.values(dependents))
  }, [dependents])

  useEffect(() => {
      handleVerifyCheckbox(selectedItens, id)
  }, [selectedItens, id])

  const handleVerifyCheckbox = (objectItem, idSelected) => {
    if (objectItem[idSelected]) {
      setCheckboxSelecionado(objectItem[idSelected].state)
    } else {
      setCheckboxSelecionado(false)
    }

  }

  const removeIdFromSelectedItens = () => {

  }

  const handleTogglePanel = () => {
    setAbrirCollapsible(!abrirCollapsible)
  }


  const handleClickCheckbox = () => {
    if (checkboxSelecionado === "active") {
      removeIdFromSelectedItens()
    } else if(checkboxSelecionado === "indeterminate"){

    } else {
      const objectDesintegrate = {}
      objectDesintegrate[id] = {state: "active"}
      manageSelectedItens({ ...selectedItens, ...objectDesintegrate })
    }
  }

  return (
    <div key={id}>
      <div onClick={() => {}} className="header">
        <button value={checkboxSelecionado} onClick={handleClickCheckbox}>
          {checkboxSelecionado ? 'Selecionado' : 'Não selecionado'}
        </button>
        {name}
        {filhos.length > 0 && (
          <>
            {abrirCollapsible ? (
              <FaChevronUp value={abrirCollapsible} onClick={handleTogglePanel} />
            ) : (
              <FaChevronDown value={abrirCollapsible} onClick={handleTogglePanel} />
            )}
          </>
        )}
      </div>
      {abrirCollapsible && filhos.length > 0 && (
        <div className="content">
          {filhos?.map(({ name, children, id }) => {
            return (
              <Dropbox
                name={name}
                dependents={children}
                id={id}
                key={id}
                idPai={[...idPai, id]}
                selectedItens={selectedItens}
                manageSelectedItens={manageSelectedItens}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropbox

