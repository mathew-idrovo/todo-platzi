import React, { useState } from 'react'

function useStoregeListener(sincronize) {
  const [storageChange, setStorageChange] = useState(false)
  window.addEventListener('storage', (change) => {
    if (change.key === 'TODOS_V1') {
      console.log('CAMBIOS EN TODOS')
      setStorageChange(true)
    }
  })

  const toggleShow = () => {
    sincronize()
    setStorageChange(false)
  }
  return {
    show: storageChange,
    toggleShow,
  }
}

export default useStoregeListener
