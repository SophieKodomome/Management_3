'use client'

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import MyLabel from "./myLabel";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getNPV(values: any) {
  let NPV = 0;
  const percentile = values.discountRate * 0.01;
  for (let index = 0; index < values.timePeriod; index++) {
    NPV += values.cashFlows[index] / Math.pow(1 + percentile, index + 1);
    console.log("TRI" + (index + 1) + ": " + Math.pow(1 + percentile, index + 1));
    console.log("NPV" + (index + 1) + ": " + NPV);
  }
  NPV = NPV - values.initialInvestment;
  console.log("NPV " + NPV);
  return NPV;
}

function suggestNewRate(values: any, npv: number) {
  const tolerance = 0.01;
  let lowRate = 0;
  let highRate = values.discountRate;
  let newRate = (lowRate + highRate) / 2;
  let newNPV = npv;
  
  while (Math.abs(newNPV) > tolerance) {
    newRate = (lowRate + highRate) / 2;
    const newValues = { ...values, discountRate: newRate };
    newNPV = getNPV(newValues);

    if (newNPV > 0) {
      lowRate = newRate;
    } else {
      highRate = newRate;
    }
  }
  
  return newRate.toFixed(2);
}

export default function Home() {
  const stringMotive = "motive";
  const stringInvestment = "initialInvestment";
  const stringDiscountRate = "discountRate";
  const stringTimePeriod = "timePeriod";
  const stringFieldClass = "rounded-md bg-gray-800 py-2 px-2 hover:bg-gray-700 focus:outline-none";
  const stringButtonClass = "group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-sky-300 hover:before:[box-shadow:_20px_20px_20px_30px_#29c5f6] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-300 relative bg-gray-900 h-16 border text-left p-3 text-gray-100 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-sky-300 after:right-8 after:top-3 after:rounded-full after:blur-lg";
  const stringSectionClass = "flex flex-col space-y-2 mb-5";
  const stringArticleClass = "p-10 shadow-lg rounded-xl bg-gray-950 mx-10";
  const [npv, setNpv] = useState<number | null>(null);
  const [suggestedRate, setSuggestedRate] = useState<string | null>(null);
  const [cashFlowData, setCashFlowData] = useState<number[]>([]);
  const [timePeriods, setTimePeriods] = useState<number[]>([]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (values: any) => {
    setIsSubmitted(true);
    const npvValue = getNPV(values);
    setNpv(npvValue);
    setCashFlowData(values.cashFlows);
    setTimePeriods(Array.from({ length: values.timePeriod }, (_, i) => i + 1));

    if (npvValue < 0) {
      const newRate = suggestNewRate(values, npvValue);
      setSuggestedRate(newRate);
    } else {
      setSuggestedRate(null);
    }
  };

  const [showDiv, setShowDiv] = useState(false);
  const handleButtonClick = () => {
    setShowDiv(true);
  };

  const chartData = {
    labels: timePeriods,
    datasets: [
      {
        label: 'Flux de trésorerie',
        data: cashFlowData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <main className="flex justify-center text-gray-100">
      <main className="flex flex-row mt-10">
        <article className={stringArticleClass}>
          <h1 className="font-bold text-4xl mb-5 text-cyan-300">Math Financiere</h1>
          <Formik
            initialValues={{
              motive: "",
              initialInvestment: "",
              discountRate: "",
              timePeriod: 1,
              cashFlows: [""]
            }}
            validateOnChange={true}
            validateOnBlur={true}
            validate={values => {
              const errors: any = {};
              if (!values.motive) {
                errors.motive = "Ecrivez vos motifs";
              }
              if (!values.initialInvestment) {
                errors.initialInvestment = "Ecrivez le montant desire";
              } else if (values.initialInvestment <= 0) {
                errors.initialInvestment = "votre montant doit etre positif";
              }
              if (!values.discountRate) {
                errors.discountRate = "Demander l'interet que vous estimez";
              } else if (values.discountRate <= 0) {
                errors.discountRate = "votre interet doit etre positif";
              }
              if (!values.timePeriod) {
                errors.timePeriod = "Decriver la periode de temps";
              } else if (values.timePeriod <= 0) {
                errors.timePeriod = "La periode doit etre en avant";
              }
              values.cashFlows.forEach((cashFlow, index) => {
                if (!cashFlow) {
                  if (!errors.cashFlows) errors.cashFlows = [];
                  errors.cashFlows[index] = "Decrivez votre flux";
                }
              });
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              handleSubmit(values);
            }}
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form className="flex flex-col">
                <section className={stringSectionClass}>
                  <MyLabel text="Motif" htmlFor={stringMotive}></MyLabel>
                  <Field className={stringFieldClass} type="text" name={stringMotive} id={stringMotive} />
                  <ErrorMessage className="text-red-600" name={stringMotive} component="p" />
                </section>
                <section className={stringSectionClass}>
                  <MyLabel text="Montant demand&eacute;" htmlFor={stringInvestment}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringInvestment} id={stringInvestment} />
                  <ErrorMessage className="text-red-600" name={stringInvestment} component="p" />
                </section>
                <hr className="my-5 opacity-30"></hr>
                <section className={stringSectionClass}>
                  <MyLabel text="Inter&ecirc;t" htmlFor={stringDiscountRate}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringDiscountRate} id={stringDiscountRate} />
                  <ErrorMessage className="text-red-600" name={stringDiscountRate} component="p" />
                </section>
                <section className={stringSectionClass}>
                  <MyLabel text="P&eacute;riode de temps(Ann&eacute;e)" htmlFor={stringTimePeriod}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringTimePeriod} id={stringTimePeriod} min="1"
                    onChange={e => {
                      const newTimePeriod = parseInt(e.target.value, 10);
                      const newCashFlows = Array(newTimePeriod).fill("");
                      setFieldValue("timePeriod", newTimePeriod);
                      setFieldValue("cashFlows", newCashFlows);
                    }}
                  />
                  <ErrorMessage className="text-red-600" name={stringTimePeriod} component="p" />
                </section>
                <hr className="my-5 opacity-30"></hr>
                <FieldArray
                  name="cashFlows"
                  render={arrayHelpers => (
                    <div>
                      {values.cashFlows && values.cashFlows.length > 0 && values.cashFlows.map((cashFlow, index) => (
                        <section className={stringSectionClass} key={index}>
                          <MyLabel text={`Flux de tresorerie ${index + 1}`} htmlFor={`cashFlows.${index}`}></MyLabel>
                          <Field className={stringFieldClass} type="number" name={`cashFlows.${index}`} id={`cashFlows.${index}`} />
                          <ErrorMessage className="text-red-600" name={`cashFlows.${index}`} component="p" />
                        </section>
                      ))}
                    </div>
                  )}
                />
                <hr className="my-5 opacity-30"></hr>
                <button className={stringButtonClass} type="submit" disabled={isSubmitting} onClick={handleButtonClick}>
                  Estimer le plan
                </button>
              </Form>
            )}
          </Formik>
        </article>
        {isSubmitted && (
          <aside className="p-10 shadow-lg rounded-xl bg-gray-950 mx-10 text-center">
            <h1 className="font-bold text-4xl mb-5 text-cyan-300">Resultat</h1>
            <h2 className="text-3xl">Valeur Actuelle Nette (VAN):</h2>
            <p className="font-bold text-6xl text-sky-800">{npv != null ? npv.toFixed(2) : "Calculating..."}</p>
            <p className="text-2xl">
              {npv !== null ? (npv > 0 ? "Le project est profitable!" : "Le project n'est pas profitable.") : "Calculating..."}
            </p>
            {suggestedRate && (
              <div className="mt-5">
                <h2 className="text-2xl text-yellow-400">Suggestion d'amélioration :</h2>
                <p className="text-xl mt-2">
                  Pour rendre le projet rentable, vous pouvez essayer un taux d'intérêt de <span className="font-bold text-yellow-400">{suggestedRate}%</span>.
                </p>
              </div>
            )}
            <h2 className="text-3xl mt-10">Flux de Trésorerie Chronologique:</h2>
            <Line data={chartData} />
          </aside>
        )}
      </main>
    </main>
  );
}
