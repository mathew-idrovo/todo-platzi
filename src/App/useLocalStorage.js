import React, { useEffect, useState } from 'react'

function useLocalStorage(itemName, initialValue) {
  const [sincronizedItem, setsincronizedItem] = useState(true)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(initialValue)

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStoreItem = localStorage.getItem(itemName)
        let parsedItem

        if (!localStoreItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue))
          parsedItem = initialValue
        } else {
          parsedItem = JSON.parse(localStoreItem)
        }
        setItem(parsedItem)
        setLoading(false)
        setsincronizedItem(true)
      } catch (error) {
        setError(error)
      }
    }, 3000)
  }, [sincronizedItem])

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem)
      localStorage.setItem(itemName, stringifiedItem)
      setItem(newItem)
    } catch (error) {
      setError(error)
    }
  }

  const sincronizeItem = () => {
    setLoading(true)
    setsincronizedItem(false)
  }
  return {
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  }
}

export default useLocalStorage
