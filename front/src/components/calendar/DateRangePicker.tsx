import { roomAPI } from "API/roomAPI";
import { useState } from "react";

const initialInputState: DatesInput = {
  fromDate: new Date().toISOString().slice(0, 10),
  toDate: new Date().toISOString().slice(0, 10),
};

const DatePickerRange = () => {
  const [date, setDate] = useState<DatesInput>(initialInputState);

  //step 1: elijo  dia 14 de dic en el input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value); // muestra dia correcto, es decir 14 de dic:  2022-12-14
    console.log(new Date(e.target.value), "ESTO MUESTRA MAL"); //muestra 13 de dic MALLLL
    console.log(new Date(e.target.value).toISOString(), "esto MUESTRA BIEN"); //2022-12-14T00:00:00.000Z
    console.log(
      new Date(e.target.value + "T00:00"),
      "BIEN, pero me muestra hora arg"
    ); //Wed Dec 14 2022 00:00:00 GMT-0300 (heure normale d’Argentine)
    //si uso el método de agregar "T00:00" es como q c/persona me va a mandar una fecha diferente
    console.log(
      new Date(e.target.value + "T00:00:00Z"),
      "BIEN, pero me muestra hora arg BIS"
    );
    console.log(e.target.valueAsDate, "ESTO MUESTRA MAL 2"); //suponete q elij0 14 de dic en el calendar, me muestra en el clg 13 de dic a las 21hs, eso xq infiere q la date post es GMT 0, a las 0hs
    //suponete q elij0 14 de dic en el calendar, me muestra en el clg 13 de dic a las 21hs, eso xq infiere q la date post es GMT 0, a las 0hs
    //Ahora bien, eso me puede traer complications???, digo, si lo traduce a getDay
    console.log(
      (e.target.valueAsDate as Date).getUTCDate(),
      "MUESTRA MAL 3, arrastra"
    ); //SI!!!!! me tira el nro 13 (claro, xq getDate le chupa un huevo el horario, se enfoca nada + en lo literal)
    //x todo esto considero q es mejor guardar el useState date input value/output como string, y no usar valueAsDate

    setDate((v) => ({ ...v, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    roomAPI.getAvailableBookings(date);
  }
  return (
    <>
      {JSON.stringify(date?.fromDate)}
      <div style={{ color: "red" }}>-----------------</div>
      <form onSubmit={handleSubmit}>
        <label>Desde</label>
        <input
          type="date"
          name="fromDate"
          onChange={handleChange}
          value={date.fromDate}
        ></input>
        <label>Hasta</label>
        <input
          type="date"
          name="toDate"
          onChange={handleChange}
          value={date.toDate}
        />
        <input type="submit" value="Enviar"></input>
      </form>
      <div style={{ color: "red" }}>-----------------</div>
    </>
  );
};

export default DatePickerRange;
