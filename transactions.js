const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expanseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON
  .parse(localStorage
  .getItem('transactions'))

let transactions = localStorage
  .getItem('transactions') !== null ? localStorageTransactions : []


const deleteTransaction = id =>{
  transactions.pop(id, 1)
  init()
  updateLocalStorage()
}


const addTransactionIntoDOM = ({ amount, name, id }) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${name} 
        <span>${operator}R$${amountWithoutOperator} </span> 
        <button class='delete-btn' onclick="deleteTransaction(${id})">x</button>
    `
  transactionsUl.append(li)
}

const getExpense = transactionsAmounsts => Math.abs(transactionsAmounsts
  .filter(value => value < 0)
  .reduce((accumulator, value) => accumulator + value, 0))
  .toFixed(2)

const getIncome = transactionsAmounsts => transactionsAmounsts
  .filter(value => value > 0)
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2)

const getTotal = transactionsAmounsts => transactionsAmounsts
  .reduce((accumulator, transaction) => accumulator + transaction, 0)
  .toFixed(2)

const updateBalanceValues = () =>{
    const transactionsAmounsts = transactions.map(({ amount }) => amount)

    const total = getTotal(transactionsAmounsts)
    const income = getIncome(transactionsAmounsts)
    const expense = getExpense(transactionsAmounsts)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expanseDisplay.textContent = `R$ ${expense}`

}

const init = () =>{
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init() // 

const updateLocalStorage = () =>{
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({ 
    id: generateID(),
    name: transactionName,
    amount: +transactionAmount 
  })
}

const cleanInputs = () =>{
  inputTransactionAmount.value = ''
  inputTransactionName.value = ''
}

const handleFormSubmit = event => { 
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()
  const isSomeInput = transactionAmount === '' || transactionName === ''

  if(isSomeInput){
    alert('Todos os campos devem ser preenchidos!')
    return
  }

  addToTransactionsArray(transactionName, transactionAmount)
  init()
  updateLocalStorage()
  cleanInputs()

}

form.addEventListener('submit', handleFormSubmit) 


