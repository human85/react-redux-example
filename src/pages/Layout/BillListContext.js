const { createContext, useReducer, useContext } = require('react')

export const BillListContext = createContext(null)
export const BillListDispatchContext = createContext(null)

export function BillListProvider({ children }) {
  const [billList, dispatch] = useReducer(BillListReducer, [])

  return (
    <BillListContext.Provider value={billList}>
      <BillListDispatchContext.Provider value={dispatch}>{children}</BillListDispatchContext.Provider>
    </BillListContext.Provider>
  )
}

export function useBillList() {
  return useContext(BillListContext)
}

export function useBillListDispatch() {
  return useContext(BillListDispatchContext)
}

function BillListReducer(billList, action) {
  switch (action.type) {
    case 'replaced': {
      return action.data
    }
    case 'changed': {
      return billList.map(bill => {
        if (bill.id !== action.id) return bill
        return {
          ...bill,
          money: action.money,
          date: new Date(),
          useFor: action.useFor
        }
      })
    }
    default: {
      throw Error('未知 action ' + action.type)
    }
  }
}
