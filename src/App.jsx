import './App.css'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import { useState } from 'react';

const buttonStyle = {
  border: '1px solid black',
  // Add any other styles you need
};
function App() {
  const [interest, setInterest] = useState(0)
  const [amount, setAmount] = useState(0)
  const [rate, setRate] = useState(0)
  const [year, setYear] = useState(0)

  const [validAmount, setValidAmount] = useState(true)
  const [validRate, setValidRate] = useState(true)
  const [validYear, setValidYear] = useState(true)

  const validateUserInput = (e) => {
    const { name, value } = e.target
    // console.log(`${name},${value}`);
    if (!!value.match(/^\d+(\.\d+)?$/)) {
      if (name === 'amount') {
        setAmount(value)
        setValidAmount(true)
      }
      else if (name === 'rate') {
        setRate(value)
        setValidRate(true)
      }
      else {
        setYear(value)
        setValidYear(true)
      }
    }
    else {
      if (name === 'amount') {
        setAmount(value)
        setValidAmount(false)
      }
      else if (name === 'rate') {
        setRate(value)
        setValidRate(false)
      }
      else {
        setYear(value)
        setValidYear(false)
      }
    }
  }

  const callReset = () => {
    setAmount(0)
    setRate(0)
    setYear(0)
    setInterest(0)
    setValidAmount(true)
    setValidRate(true)
    setValidYear(true)

  }

  const callCalculate = (e) => {
    e.preventDefault()
    if(!amount||!rate||!year){
      alert("Please fill the form completely!!!")
    }
    else{
      setInterest(amount*rate*year/100)
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex align-items-center justify-content-center bg-dark'>
      <div style={{ width: '450px' }} className='bg-light p-3 rounded text-center'>
        <h4>Simple Interest Calculator</h4>
        <p>Calculate your simple interest easily</p>
        <div style={{ width: '100%', height: '130px' }} className='d-flex align-items-center justify-content-center bg-warning text-light flex-column mt-5 shadow rounded'>
          <h1 className='fw-bold'>&#8377; {interest}</h1>
          <p className='fw-bolder'>Total Simple Interest</p>
        </div>
        <form onSubmit={callCalculate}>
          <div>
            <TextField className='w-100 mt-4' id="outlined-basic-amount" label="Principle Amount (in &#8377;)" name="amount"
              value={amount || ""} variant="outlined" onChange={e => { validateUserInput(e) }} />
            {
              !validAmount && <div className='text-danger mb-3 fw-bolder'>
                Invalid Principle Amount
              </div>
            }
            <TextField className='w-100 mt-2' id="outlined-basic-rate" label="Rate Of Interest (in %)" name="rate"
              value={rate || ""} variant="outlined" onChange={e => { validateUserInput(e) }} />
            {
              !validRate && <div className='text-danger mb-3 fw-bolder'>
                Invalid Rate
              </div>
            }
            <TextField className='w-100 mt-2' id="outlined-basic-year" label="Time Period (in year)" name="year"
              value={year || ""} variant="outlined" onChange={e => { validateUserInput(e) }} />
            {
              !validYear && <div className='text-danger mb-3 fw-bolder'>
                Invalid Year
              </div>
            }
          </div>

          <Stack direction="row" spacing={2} className='mt-4'>
            <Button className='w-50 bg-light text-dark' variant="outlined" style={buttonStyle} onClick={callReset}>Reset</Button>
            <Button className='w-50 bg-dark text-light' variant="contained" disabled={validAmount && validRate && validYear ? false : true} type='submit'>Calculate</Button>
          </Stack>
        </form>
      </div>
    </div>
  )
}

export default App
