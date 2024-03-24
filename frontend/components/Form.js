import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as yup from 'yup';

const ENDPOINT = 'http://localhost:9009/api/order';

const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

const formSchema = yup.object().shape({
  size: yup
    .string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required(),
  fullName: yup
    .string()
    .trim()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required(),
  toppings: yup
    .array()
})

const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

const initialValues = { size: '', fullName: '', toppings: [] };
const initialErrors = { size: '', fullName: '' }

export default function Form() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [enabled, setEnabled] = useState(false);
  const [serverSuccess, setServerSuccess] = useState('');
  const [serverFailure, setServerFailure] = useState('');

  useEffect(() => {
    formSchema.isValid(values)
      .then(isValid => {
        setEnabled(isValid);
      })
  }, [values])

  const onChange = (evt) => {
    let { id, value } = evt.target;
    setValues({ ...values, [id]: value })
    yup
      .reach(formSchema, id)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [id]: '' })
      })
      .catch((err) => {
        setErrors({ ...errors, [id]: err.errors[0] })
      })
  }

  const changeTopping = (evt) => {
    let { id, checked } = evt.target;
    const newToppings = [...values.toppings]
    if (checked) newToppings.push(id);
    else {
      newToppings.splice(newToppings.indexOf(id), 1);
    }
    setValues({ ...values, toppings: newToppings });
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    setEnabled(false);
    axios.post(ENDPOINT, values)
      .then(res => {
        setValues(initialValues);
        setServerSuccess(res.data.message);
        setServerFailure('');
      })
      .catch(err => {
        setServerFailure(err.response.data.message)
        setServerSuccess('');
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Order Your Pizza</h2>
      {serverSuccess && <div className='success'>{serverSuccess}</div>}
      {serverFailure && <div className='failure'>{serverFailure}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            placeholder="Type full name"
            id="fullName"
            type="text"
            value={values.fullName}
            onChange={onChange}
          />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" value={values.size} onChange={onChange} >
            <option value="">----Choose Size----</option>
            <option value='S'>Small</option>
            <option value='M'>Medium</option>
            <option value='L'>Large</option>
          </select>
        </div>
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div className="input-group">
        {toppings.map(topping => {
          return (
            <label key={topping.topping_id}>
              <input
                name={topping.text}
                id={topping.topping_id}
                type='checkbox'
                checked={values.toppings.includes(topping.topping_id)}
                onChange={changeTopping}
              />
              {topping.text}<br />
            </label>
          )
        })}
      </div>
      <input type="submit" disabled={!enabled} />
    </form>
  )
}
