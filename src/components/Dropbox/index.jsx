import React, { useState, useEffect } from 'react'
import Collapsible from '../Collapsible/index.jsx'

import './styles.css'

const Dropbox = ({ name, child, id}) => {

  useEffect(() => {
    handleCriarFilhos()
  }, [])

  const [checkboxSelecionado, setCheckboxSelecionado] = useState(false)
  const [checkboxFilhoSelecionado, setCheckboxFilhoSelecionado] = useState(false)
  const [abrirCaixaComFilhos, setAbrirCaixaComFilhos] = useState(false)
  const [filhos, setFilhos] = useState([])

  const handleCriarFilhos = () => {
    if (child) {
      setFilhos(Object.values(child).map((filho) => {
        return <Dropbox name={filho.name} child={filho.children} id={filho.id}/>
      }))
    }
  }

  return (
    <div>
      <Collapsible open title={name}>
        {filhos}
      </Collapsible>

    </div>
  )
}

export default Dropbox
