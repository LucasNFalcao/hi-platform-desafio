import React, { useState, useEffect } from 'react'
import Collapsible from '../Collapsible'

import './styles.css'

const Container = () => {

  const [data, setData] = useState([])
  const [arvoreDeItens, setArvoreDeItens] = useState(null)

  useEffect(() => {
    catchJSON()
  }, [])

  useEffect(() => {
    handleCreateCollapsible()
  }, [])

  const catchJSON = async () => {
    const response = await fetch("./data.json")
    const json = await response.json()
    setData(Object.values(json))
  }

  const handleCreateCollapsible = () => {
    setArvoreDeItens(data?.map((objeto) =>
    {
      return <Collapsible id={objeto.id} name={objeto.name} dependents={objeto.children} />
    }))
  }

  return (
    <div>
      {arvoreDeItens}
    </div>
  )
}

export default Container
