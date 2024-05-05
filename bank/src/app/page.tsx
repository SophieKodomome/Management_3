'use client'

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MyLabel from "./myLabel";

export default function Home() {
  const stringMotive = "motive"
  const stringInvestment = "initialInvestment"
  const stringCashFlow = "cashflow"
  const stringDiscountRate = "discountrate"
  const stringTimePeriod = "timePeriod"
  const stringTimeLapse = "timeLapse"
  const stringFieldClass = "rounded-md bg-gray-800 py-2 px-2 hover:bg-gray-700 focus:outline-none"
  const stringButtonClass = "group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-sky-300 hover:before:[box-shadow:_20px_20px_20px_30px_#29c5f6] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-300 relative bg-gray-900 h-16 border text-left p-3 text-gray-100 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-800 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-sky-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
  const stringSectionClass = "flex flex-col space-y-2 mb-5"
  return (
    <main className="flex justify-center text-gray-100">
      <main>
        {/*<header>
          <h1>Flux</h1>
          <h6>Voyez l&apos;avenir de vos projet d&apos;avenir!</h6>
        </header>*/
        }
        <article className="p-10 shadow-lg rounded-xl bg-gray-950 my-10">
          <h1 className="font-bold text-4xl mb-5 text-cyan-300">Dites-nous en plus!</h1>
          <Formik
            initialValues={{
              motive: "",
              initialInvestment: "",
              cashFlow: "",
              discountRate: "",
              timePeriod: "",
              timeLapse: ""

            }}
            validate={values => {
              const errors = {};
              // Add your form validation logic here
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              // Handle form submission here
              console.log(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col">
                <section className={stringSectionClass}>
                  <MyLabel text="Motif" htmlFor={stringMotive}></MyLabel>
                  <Field className={stringFieldClass} type="text" name={stringMotive} id={stringMotive} />
                  <ErrorMessage name={stringMotive} component="div" />
                </section>
                <section className={stringSectionClass}>
                  <MyLabel text="Montant demand&eacute;" htmlFor={stringInvestment}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringInvestment} id={stringInvestment} />
                  <ErrorMessage name={stringInvestment} component="div" />
                </section>
                <hr className="my-5 opacity-30"></hr>
                <section className={stringSectionClass}>
                  <MyLabel text="Flux de tr&eacute;sorerie" htmlFor={stringCashFlow}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringCashFlow} id={stringCashFlow} />
                  <ErrorMessage name={stringCashFlow} component="div" />
                </section>
                <section className={stringSectionClass}>
                  <MyLabel text="Inter&ecirc;t" htmlFor={stringDiscountRate}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringDiscountRate} id={stringDiscountRate} />
                  <ErrorMessage name={stringDiscountRate} component="div" />
                </section>
                <hr className="my-5 opacity-30"></hr>
                <section className={stringSectionClass}>
                  <MyLabel text="P&eacute;riode de temps" htmlFor={stringTimePeriod}></MyLabel>
                  <Field className={stringFieldClass} type="number" name={stringTimePeriod} id={stringTimePeriod} />
                  <ErrorMessage name={stringTimePeriod} component="div" />
                </section>
                <section className={stringSectionClass}>
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
                </section>
                <hr className="my-5 opacity-30"></hr>
                <button  className={stringButtonClass} type="submit" disabled={isSubmitting}>
                  Estimer le plan
                </button>
              </Form>
            )}
          </Formik>
        </article>
      </main>
    </main>
  );
}
