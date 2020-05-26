import React from 'react';
import DatePicker from "react-datepicker";
import NumberFormat from 'react-number-format';


const DatePickerElement = props => {
  
  const ButtonInput = ({ value, onClick }) => (
    <button className="custom-date-input" onClick={onClick}>
      {value}
    </button>
  )
  return (
    <div className="mb-3">
      <div className="form-label">Date</div>
      <DatePicker
        selected={props.date}
        onChange={date => props.setDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        customInput={<ButtonInput />}
        withPortal
      />
    </div>
  )
}


const InputAmount = props => {
  return (
    <div className="mb-3 input-amount-container">
      <div className="form-label">Amount</div>
      
      <NumberFormat
        className={props.amountError ? 'input-amount error' : 'input-amount'}
        thousandSeparator={true}
        prefix={'$'}
        min={0}
        value={props.amount}
        onValueChange={values=>{
          props.setAmount(Number(values.value))
          props.setAmountError(false)
        }} 
      />
     
      <span className={props.amount < 0 ? "option selected" : "option"}
        onClick={()=>{
          if(props.amount > -1) {
            props.setAmount(Number(props.amount)*-1)
            props.setAmountError(false)
          }
        }}
        >Outcome</span>
      <span className={props.amount < 0 ? "option" : "option selected"}
        onClick={()=>{
          if(props.amount < 0) {
            props.setAmount(Number(props.amount)*-1)
            props.setAmountError(false)
          }
        }}
        >Incomes</span>
     
      {props.amountError &&
        <div className="error">Check your Info!</div>
      }
    </div>
  )
}


const InputDescription = props => {
  return (
    <div>
      <div className="form-label">Description</div>
      <textarea
        className={props.descriptionError ? "input-description error" : 'input-description'}
        value={props.description}
        rows='3'
        onChange={event=>{
          props.setDescription(event.target.value)
          props.setDescriptionError(false)
        }}
      />
     
      {
        props.descriptionError &&
        <div className="error">Description</div>
      }
    </div>
  )
}

const Form = props => {
  
  const { date, amount, amountError, description, descriptionError } = props

  return (
    <div className="form">
      <DatePickerElement
        date={date.date}
        setDate={date.setDate}
      />
      <InputAmount 
        amount={amount.amount}
        setAmount={amount.setAmount}
        amountError={amountError.amountError}
        setAmountError={amountError.setAmountError}
      />
      <InputDescription
        description={description.description}
        setDescription={description.setDescription}
        descriptionError={descriptionError.descriptionError}
        setDescriptionError={descriptionError.setDescriptionError}
      />
    </div>
  )
}

export default Form;