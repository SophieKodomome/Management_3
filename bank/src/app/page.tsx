'use client'

import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import MyLabel from "./myLabel"

function getNPV(values: any){
  var NPV=0;
  const percentile=values.discountRate*0.01
  for (let index = 0; index < values.timePeriod; index++) {
    NPV=NPV+(values.cashFlow)/(Math.pow(1+percentile,index+1))
    console.log("TRI" +(index+1)+": "+ Math.pow(1+percentile,index+1))
    console.log("NPV"+(index+1)+": "+ NPV)
  }
  NPV=NPV-values.initialInvestment
  console.log("NPV "+NPV)
  return NPV
}

export default function Home() {
  const stringMotive = "motive"
  const stringInvestment = "initialInvestment"
  const stringCashFlow = "cashFlow"
  const stringDiscountRate = "discountRate"
  const stringTimePeriod = "timePeriod"
  const stringTimeLapse = "timeLapse"
  const stringFieldClass = "rounded-md bg-gray-800 py-2 px-2 hover:bg-gray-700 focus:outline-none"
  const stringButtonClass = "group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-sky-300 hover:before:[box-shadow:_20px_20px_20px_30px_#29c5f6] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-300 relative bg-gray-900 h-16 border text-left p-3 text-gray-100 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-sky-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
  const stringSectionClass = "flex flex-col space-y-2 mb-5"
  const stringArticleClass = "p-10 shadow-lg rounded-xl bg-gray-950 mx-10"
  const [npv, setNpv] = useState<number | null>(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false) // State variable to track form submission
  const handleSubmit = (values: any) => {
    setIsSubmitted(true);
    const npvValue = getNPV(values);
    setNpv(npvValue);
  };
  

  const [showDiv, setShowDiv] = useState(false);
  const handleButtonClick = () => {
      setShowDiv(true);
  };
  return (
    <main className="flex justify-center text-gray-100">
      <main className="flex flex-row mt-10">
        {/*<header>
          <h1>Flux</h1>
          <h6>Voyez l&apos;avenir de vos projet d&apos;avenir!</h6>
        </header>*/
        }
        <article className={stringArticleClass}>
          <h1 className="font-bold text-4xl mb-5 text-cyan-300">Math Financiere</h1>
          <Formik
            initialValues={{
              motive: "",
              initialInvestment: "",
              cashFlow: "",
              discountRate: "",
              timePeriod: "",
              //timeLapse: ""
            }}
            validateOnChange={true} // Run validation on change
            validateOnBlur={true} // Run validation on blur
            validate={values => {
              const errors = {};
              if (!values.motive) {
                errors.motive = "Ecrivez vos motifs"
              }
              if (!values.initialInvestment) {
                errors.initialInvestment = "Ecrivez le montant desire"
              } else if (values.initialInvestment <= 0) {
                errors.initialInvestment = "votre montant doit etre positif"
              }
              if (!values.cashFlow) {
                errors.cashFlow = "Decrivez votre flux"
              }
              if (!values.discountRate) {
                errors.discountRate = "Demander l'interet que vous estimez"
              } else if (values.discountRate <= 0) {
                errors.discountRate = "votre interet doit etre positif"
              }
              if (!values.timePeriod) {
                errors.timePeriod = "Decriver la periode de temps"
              } else if (values.timePeriod <= 0) {
                errors.timePeriod = "La periode doit etre en avant"
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false)
              handleSubmit(values)
            }}
          >

            {({ isSubmitting }) => (
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
                  <MyLabel text="Flux de tr&eacute;sorerie" htmlFor={stringCashFlow}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringCashFlow} id={stringCashFlow} />
                  <ErrorMessage className="text-red-600" name={stringCashFlow} component="p" />
                </section>
                <section className={stringSectionClass}>
                  <MyLabel text="Inter&ecirc;t" htmlFor={stringDiscountRate}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringDiscountRate} id={stringDiscountRate} />
                  <ErrorMessage className="text-red-600" name={stringDiscountRate} component="p" />
                </section>
                <hr className="my-5 opacity-30"></hr>
                <section className={stringSectionClass}>
                  <MyLabel text="P&eacute;riode de temps(Ann&eacute;e)" htmlFor={stringTimePeriod}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringTimePeriod} id={stringTimePeriod} />
                  <ErrorMessage className="text-red-600" name={stringTimePeriod} component="p" />
                </section>
                {/*<section className={stringSectionClass}>
                  <MyLabel text="Lapse" htmlFor="selectLapse"></MyLabel>
                  <span className="radio-inputs">
                    <label className="radio">
                      <Field type="radio" name={stringTimeLapse} value="year" />
                      <span className="name">Annuel</span>
                    </label>
                    <label className="radio">
                      <Field type="radio" name={stringTimeLapse} value="month" />
                      <span className="name">Mensuel</span>
                    </label>

                    <label className="radio">
                      <Field type="radio" name={stringTimeLapse} value="semester" />
                      <span className="name">Semestriel</span>
                    </label>

                    <label className="radio">
                      <Field type="radio" name={stringTimeLapse} value="trimester" />
                      <span className="name">Trimestriel</span>
                    </label>
                  </span>
                </section>*/}
                <hr className="my-5 opacity-30"></hr>
                <button className={stringButtonClass} type="submit" disabled={isSubmitting} onClick={handleButtonClick}>
                  Estimer le plan
                  </button>
              </Form>
            )}
          </Formik>
        </article>
        {isSubmitted && (
                  <aside className="card">
                    <h1 className="heading">Resultat</h1>
                    <h2>Valeur Actuelle Nette (VAN):</h2> 
                    <p className="font-bold text-6xl text-sky-800">{npv != null ? npv.toFixed(2) : "Calculating..."}</p>
                    <p>
  {npv !== null ? (npv > 0 ? "Le project est profitable!" : "Le project n'est pas profitable.") : "Calculating..."}
                    </p>
                  </aside>
                )}
      </main>
    </main>
  )
}
