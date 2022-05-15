import React, { useState, useEffect } from 'react'
import Collapsible from '../Collapsible'
import Dropbox from '../Dropbox'

import './styles.css'

const Container = () => {
  const [data, setData] = useState([])
  const [selectedItens, setSelectedItens] = useState({})

  useEffect(() => {
    catchJSON()
  }, [])

  const catchJSON = async () => {
    const response = await fetch('./data.json')
    const json = await response.json()
    setData(Object.values(json))
  }

  const manageSelectedItens = (item) => {
    setSelectedItens(item)
  }

  return (
    <div>
      {data.length > 0 &&
        data?.map((objeto) =>
            <Dropbox
            id={objeto.id}
            key={objeto.id}
            name={objeto.name}
            dependents={objeto.children}
            idAncestrais={[objeto.id]}
            idPai="origin"
            selectedItens={selectedItens}
            manageSelectedItens={manageSelectedItens}

            />
        )}
    </div>
  )
}

export default Container
