import React, { useState, useEffect } from 'react'
import Collapsible from '../Collapsible'

import './styles.css'

const Container = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    catchJSON()
  }, [])

  const catchJSON = async () => {
    const response = await fetch('./data.json')
    const json = await response.json()
    setData(Object.values(json))
  }

  return (
    <div>
      {data.length > 0 &&
        data?.map((objeto) =>
            <Collapsible
            id={objeto.id}
            key={objeto.id}
            name={objeto.name}
            dependents={objeto.children}
            idAncestrais={[objeto.id]}
            idPai="origin"
            />
        )}
    </div>
  )
}

export default Container
