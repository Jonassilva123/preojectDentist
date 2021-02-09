/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useParams } from 'react-router-dom';
import serviceForm from '../../../services/serviceForm';
import serviceReply from '../../../services/serviceReply';

const FormContext = createContext();

export default function FormProvider({ children }) {
  const [questions, setQuestions] = useState([]);

  const [replyed, setReplyed] = useState(false);
  const { formId, clientId } = useParams();

  const getFormQuestions = async () => {
    const response = await serviceForm.find();
    return setQuestions(response);
  };

  const getReplys = async () => {
    const data = await serviceReply.search(formId, clientId);
    const reply = data.length > 0;
    setReplyed(reply);
  };

  useEffect(() => {
    getFormQuestions();
  }, []);

  useEffect(() => {
    getReplys();
  }, []);

  return (
    <FormContext.Provider value={{ questions, setQuestions, replyed }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  const { questions, setQuestions, replyed } = context;

  return { questions, setQuestions, replyed };
}
