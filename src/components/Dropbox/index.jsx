// import React, { useState, useEffect } from 'react'
// import Collapsible from '../Collapsible/index.jsx'

// import './styles.css'

// const Dropbox = ({ name, child, id}) => {

//   useEffect(() => {
//     handleCriarFilhos()
//   }, [])

//   const [checkboxSelecionado, setCheckboxSelecionado] = useState(false)
//   const [checkboxFilhoSelecionado, setCheckboxFilhoSelecionado] = useState(false)
//   const [abrirCaixaComFilhos, setAbrirCaixaComFilhos] = useState(false)
//   const [filhos, setFilhos] = useState([])

//   const handleCriarFilhos = () => {
//     if (child) {
//       setFilhos(Object.values(child).map((filho) => {
//         return <Dropbox name={filho.name} child={filho.children} id={filho.id}/>
//       }))
//     }
//   }

//   return (
//     <div>
//       <Collapsible open title={name}>
//         {filhos}
//       </Collapsible>

//     </div>
//   )
// }

// export default Dropbox

import React, { useState, useEffect } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { useNavigationContext } from '../../contexts/NavigationContext'

import './styles.css'

const Collaps = ({ name, dependents, id, idPai, selectedItens, manageSelectedItens }) => {

  const [abrirCollapsible, setAbrirCollapsible] = useState(false)
  const [checkboxSelecionado, setCheckboxSelecionado] = useState(false)
  const [filhos, setFilhos] = useState([])

  useEffect(() => {
    setFilhos(Object.values(dependents))
  }, [dependents])

  useEffect(() => {
    if (selectedItens.some((item) => item === id)) {
      setCheckboxSelecionado(true)
    } else {
      setCheckboxSelecionado(false)
    }
  }, [selectedItens, id])

  const removeIdFromSelectedItens = () => {
    const newArray = selectedItens.filter((item) => item !== id)
    const teste = newArray.find((item) => item === id)
    console.log(newArray)
    console.log(teste)
    console.log('This is remove')
    manageSelectedItens(newArray)
  }

  const handleTogglePanel = () => {
    setAbrirCollapsible(!abrirCollapsible)
  }
  const handleClickCheckbox = () => {
    if (checkboxSelecionado) {
      removeIdFromSelectedItens()
    } else {
      manageSelectedItens([...selectedItens, id])
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
              <Collaps
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

export default Collaps

