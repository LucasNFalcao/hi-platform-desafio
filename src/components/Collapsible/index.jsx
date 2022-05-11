import React, { useState, useEffect, useRef } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

import './styles.css'

const Collapsible = ({ name, dependents, id, idPai }) => {
  const [abrirCollapsible, setAbrirCollapsible] = useState(false)
  const [checkboxSelecionado, setCheckboxSelecionado] = useState(false)
  const [temFilhos, setTemFilhos] = useState(false)
  const [filhos, setFilhos] = useState([])

  useEffect(() => {
    setTemFilhos(Object.values(dependents)?.length !== 0)
    setFilhos(Object.values(dependents))
  }, [])

  useEffect(() => {
    handleCriarFilhos()
  }, [temFilhos])

  const handleCriarFilhos = () => {
    if (filhos?.length === 1) {
      setFilhos(<Collapsible name={filhos[0].name} dependents={filhos[0].children} id={filhos[0].id} idPai={id}/>)
    } else if (filhos?.length > 1) {
      setFilhos(
        filhos?.map((filho) => {
          return <Collapsible name={filho.name} dependents={filho.children} id={filho.id} idPai={id}/>
        })
      )
    } else {
      setTemFilhos(false)
    }
  }

  const handleTogglePanel = () => {
    setAbrirCollapsible(!abrirCollapsible)
  }
  const handleClickCheckbox = () => {
    setCheckboxSelecionado(!checkboxSelecionado)
  }

  return temFilhos ? (
    <div id={id}>
      <div onClick={() => {}} className="header">
        <input type="checkbox" defaultChecked={checkboxSelecionado} onChange={handleClickCheckbox} />
        {name}
        {abrirCollapsible ? (
          <FaChevronUp value={abrirCollapsible} onClick={handleTogglePanel} />
        ) : (
          <FaChevronDown value={abrirCollapsible} onClick={handleTogglePanel} />
        )}
      </div>
      {abrirCollapsible ? <div className="content">{filhos}</div> : null}
    </div>
  ) : null
}

export default Collapsible
