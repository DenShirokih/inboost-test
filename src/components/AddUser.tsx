import React from 'react';
import { Formik, Form, Field } from 'formik';
import Select, { components } from 'react-select';
import { useState } from 'react';
import { fetchAPI } from '../api/FetchAPI';
import ReactPhoneInput from 'react-phone-input-2';
import * as yup from 'yup';

const optionsLanguege = [
  { value: 'UA', label: 'Українська' },
  { value: 'EN', label: 'Англійська' },
  { value: 'DE', label: 'Німецька' },
  { value: 'FR', label: 'Французька' },
];

const optionsAddField = [
  { value: 'workplace', label: 'Місце роботи' },
  { value: 'dateofborn', label: 'Дата нарождення' },
  { value: 'age', label: 'Вік' },
];

const optionsGroup = [
  { value: 'specialize', label: 'Спеціаліст' },
  { value: 'student', label: 'Студент' },
  { value: 'teacher', label: 'Викладач' },
];

const schema = yup.object().shape({
  userName: yup.string().required(),
  lastName: yup.string().required(),
  userPhoneNumber: yup.number(),
  email: yup.string().required(),
  workplace: yup.string(),
  profession: yup.string(),
  idRole: yup.string(),
});
interface initialValuesType {
  userName: string,
  lastName: string,
  userPhoneNumber: string,
  email: string,
  workplace: string,
  language: string,
  profession: string,
  idRole: string,
  grup:string,
}
const initialValues = {
  userName: '',
  lastName: '',
  userPhoneNumber: '',
  language:'',
  email: '',
  workplace: '',
  profession: '',
  grup:'',
  idRole: 'de9b62b2-1ba9-4393-b191-efb19e05b22e',
};

const customStyles = {
  option: () => ({}),
  control: () => ({}),
  dropdownIndicator: () => ({}),
  indicatorSeparator: () => ({}),
  placeholder: () => ({}),
  valueContainer: () => ({}),
  menu: () => ({}),
};

const CustomOption = (props:any) => {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        className="checked"
        style={{
          border: props.isSelected ? '5px solid #2C7DFA' : '1px solid #2C7DFA',
        }}
      ></div>
      <components.Option isSelected styles={{}} {...props} />
    </div>
  );
};

export const AddUser: React.FC = () => {
  const [language, setLanguage] = useState('');
  const [number, setNumber] = useState('');
  const [grup,setGrup]=useState('')

  const handleSubmit = (values:initialValuesType,{ resetForm }:any) => {
    values.language = language;
    values.grup=grup
    values.userPhoneNumber = number;
   if(values.userPhoneNumber && values.grup){    
    fetchAPI(values);
    resetForm();
    setNumber(`+380`)
    alert(`Новий користувач доданий`)
  }else{
      alert(`номер телефона та група користувачів обов'язкові поля `)
    }

  };
const getGrup=(e:any)=>{
  setGrup(e.value)
}
  const getLanguage = (e:any) => {
    setLanguage(e.value);
  };

  return (
    <div className="background">
      <div className="title">
        <div className="title__lefthand">
          <button className="title__logo" />
          <h3 className="title__item">Додати користувача</h3>
        </div>
        <button className="title__close"></button>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form className="user-form" autoComplete="off">
          <label className="user-form__item">
            <p className="user-form__title">Ім'я</p>
            <Field
              type="text"
              placeholder="Марина"
              name="userName"
              className="information"
              required
            />
          </label>
          <label className="user-form__item">
            <p className="user-form__title">Прізвища</p>
            <Field
              type="text"
              name="lastName"
              placeholder="Коноваленко"
              className="information"
              required
            />
          </label>
          <label>
            <p className="user-form__title">Номер телефону</p>
            <ReactPhoneInput
            inputProps={{
              required: true
            }}
              country={'ua'}
              value={number}
              onChange={setNumber}
              buttonStyle={{
                backgroundColor: '#EAF2FF',
                color: '#000000',
                border: '1px solid #EAF2FF',
              }}
              inputStyle={{
                height: 40,
                border: '1px solid #EAF2FF',
                marginBottom: 20,
                width: 276,
              }}
            />
          </label>
          <label className="user-form__item">
            <p className="user-form__title">Email</p>
            <Field
              name="email"
              placeholder="example.com"
              className="information"
              required
            />
          </label>
          <label>
            <p className="user-form__title">Група користувачів</p>
            <Select
            options={optionsGroup}
              styles={customStyles}
              classNamePrefix="react-select"
              onChange={e => getGrup(e)}
              placeholder="Оберіть групу"
            />
          </label>
          <label>
            <p className="user-form__title">Мова</p>
            <Select
              components={{ Option: CustomOption }}
              styles={customStyles}
              classNamePrefix="react-select"
              options={optionsLanguege}
              onChange={e => getLanguage(e)}
              placeholder="Оберіть мову"
            />
          </label>
          <label>
            <p className="user-form__title">Додати поле</p>
            <Select
              styles={customStyles}
              classNamePrefix="react-select"
              options={optionsAddField}
              placeholder="Оберіть поле"
            />
          </label>
          <label className="user-form__item">
            <p className="user-form__title">Значення поля</p>
            <Field
              type="text"
              placeholder="Введіть значення"
              name="workplace"
              className="information"
            />
          </label>
          <label className="user-form__item">
            <p className="user-form__title">Професія</p>
            <Field
              type="text"
              placeholder="Front-end"
              name="profession"
              className="information"
              required
            />
          </label>
          <div className="btnWrapper">
            <button type="button" className="add-field">
              Додати поле
            </button>
            <button type="submit" className="add-user">
              Додати користувача
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
