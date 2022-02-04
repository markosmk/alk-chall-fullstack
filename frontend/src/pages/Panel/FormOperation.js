import { useState } from 'react';
const initForm = {
  concept: '',
  amount: '',
  date: '',
  type: '',
};
const FormOperation = () => {
  const [form, setForm] = useState(initForm);
  const [info, setInfo] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/operations', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result) {
        console.log(result);
        setInfo(result);
        setForm(initForm);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(form);
  };

  const handleForm = (ev) => {
    const { name, value } = ev.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <p>Message: {JSON.stringify(info)}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">Concepto</label>
        <input
          type="text"
          name="concept"
          value={form.concept}
          onChange={handleForm}
          required
        />

        <label htmlFor="">Monto</label>
        <input type="number" name="amount" value={form.amount} onChange={handleForm} />

        <label htmlFor="">Fecha</label>
        <input type="date" name="date" value={form.date} onChange={handleForm} />

        <label htmlFor="">Tipo</label>
        <select name="type" value={form.type} onChange={handleForm}>
          <option value="">--- Seleccionar ---</option>
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>

        <button>Enviar</button>
      </form>
      <h2>Resultado:</h2>
      <pre>{JSON.stringify(form)}</pre>
    </>
  );
};

export default FormOperation;
