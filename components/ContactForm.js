// components/ContactForm.js
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ContactForm() {

    // Custom error message
    const errMsg = {
        req: 'Veuillez renseigner ce champ avant de continuer.'
    }
    
    const errFieldMin = {
        req: 'Veuillez renseigner au moins 3 lettres pour ce champ.'
    }

    const errFieldMax = {
        req: 'Veuillez renseigner au maximum 20 lettres pour ce champ.'
    }

    const errEmail = {
        req: 'Votre adresse e-mail est invalide.'
    }

    // Yup schema for this form
    const ContactSchema = yup.object().shape({
        firstName: yup.string()
            .label('Prénom')
            .required(errMsg.req)
            .typeError()
            .trim()
            .min(3, errFieldMin.req)
            .max(20, errFieldMax.req),
        lastName: yup.string()
            .label('Nom')
            .required(errMsg.req)
            .min(3, errFieldMin.req)
            .trim()
            .max(64, errFieldMax.req),
        email: yup.string()
            .label('E-mail')
            .trim()
            .required(errMsg.req)
            .email(errEmail.req)
    })

    // Set up Yup as validation resolver
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(ContactSchema),
        defaultValue: { 
            email: "",
            firstName: "",
            lastName: "",
        }
    })

    // Handle form data 

    const onSubmit = (data) => {
        console.log(data)
        const email = getValues("email")
        const firstName = getValues("firstName")
        const lastName = getValues("lastName")
        
        axios
            .put(
                "api/contact", {
                    email,
                    firstName,
                    lastName
                })
            
            .then((result) => {
                if (result.status === 200) {
                    console.log(result.data.message)
                    toast('Vous êtes inscrit(e) à notre newletter! Welcome! 👋', {
                        position: toast.POSITION.TOP_CENTER})
                }
            })

            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    console.log(error.request)
                } else {
                    console.log('Error', error.message)
                }
                console.log(error.config)
            })

        reset()
        
            }
    
    return (
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} method="PUT">
                            <div>
                                <label 
                                    htmlFor="firstName" 
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Prénom
                                </label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    name="firstName"
                                    className="shadow-sm bg-gray-50 border border-lime text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                                    placeholder="Votre prénom" 
                                    {...register('firstName')} 
                                    />
                                    <p className="text-red-600">{errors.firstName?.message}</p>
                            </div>
                            <div>
                                <label 
                                    htmlFor="lastName" 
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Nom
                                </label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    name='lastName'
                                    className="shadow-sm bg-gray-50 border border-lime text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                                    placeholder="Votre nom" 
                                    {...register('lastName')}
                                    />
                                    <p className="text-red-600">{errors.lastName?.message}</p>
                            </div>
                            <div>
                                <label 
                                    htmlFor="email" 
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input 
                                    type="email" 
                                    name="email"
                                    id="email" 
                                    className="shadow-sm bg-gray-50 border border-lime text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                                    placeholder="Votre e-mail"
                                    {...register('email')}
                                    />
                                    <p className="text-red-600">{errors.email?.message}</p>
                            </div>
                                <button 
                                    type="submit"
                                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-full bg-mango sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">
                                 C&lsquo;est parti !
                                </button>
                                <div>
                                    <ToastContainer />
                                </div>
                        </form>
                </div>
        )    
}