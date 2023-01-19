function sortTransactionList(sortBy, transactions, sortStrategy){
    let transactionsCopy 
    
    if(sortBy === "category" || sortBy === "description"){
      transactionsCopy = [...transactions].sort((a, b) => {
        if(a[sortBy].toLowerCase() > b[sortBy].toLowerCase()){
          return sortStrategy[sortBy]
        }else if(a[sortBy].toLowerCase() < b[sortBy].toLowerCase()){
          return sortStrategy[sortBy] * -1
        }else {
          return 0
        }
      })
    }else if(sortBy === "amount"){
      transactionsCopy = [...transactions].sort((a, b) => {
        if(a.amount > b.amount){
          return sortStrategy.amount
        }else if(a.amount < b.amount){
          return sortStrategy.amount * -1
        }else {
          return 0
        }
      })  
    }else if(sortBy === "date"){
      transactionsCopy = [...transactions].sort((a, b) => {
        const timeA = (new Date(a.date)).getTime()
        const timeB = (new Date(b.date)).getTime()

        if(timeA> timeB){
          return sortStrategy.date
        }else if(timeA < timeB){
          return sortStrategy.date * -1
        }else {
          return 0
        }
      })       
    }

    return transactionsCopy
}


function validateForm(formData){
    const formDetails = {
      containsEmptyInput:false,
      hasInvalidDate:true,
      isInvalid:false
    }

    for(const inputData in formData){
      if(!formData[inputData]){
        formDetails.containsEmptyInput = true
        break
      }
    }

    const allowablePastDate = (new Date("2019")).getTime()
    const today = (new Date()).getTime()
    const formDataDate = (new Date(formData.date)).getTime()
    formDetails.hasInvalidDate = formDataDate < allowablePastDate ? true : formDataDate > today ? true : false

    formDetails.isInvalid = formDetails.containsEmptyInput || formDetails.hasInvalidDate || false

    return formDetails;
  }

export {sortTransactionList, validateForm}