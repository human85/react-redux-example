import { useMemo } from 'react'

function useOverview(currentList) {
  return useMemo(() => {
    let income = 0,
      expences = 0

    if (!currentList) return { income, expences, total: 0 }

    currentList.forEach(bill => {
      if (bill.money > 0) {
        income += bill.money
      } else {
        expences += bill.money
      }
    })

    return {
      income,
      expences,
      total: income + expences
    }
  }, [currentList])
}

export default useOverview
