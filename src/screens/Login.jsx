// import axios from "axios"
// import React, { useState, useEffect } from "react"
// import BaseUrl from "../components/BaseUrl"
// import { useNavigate } from "react-router-dom"
// import Profil from "./Profil"

// function Login() {
//   const [nom, setNom] = useState()
//   const [prenom, setPrenom] = useState()
//   const [email, setEmail] = useState()
//   const [password, setPassword] = useState()
//   const [customError, setCustomError] = useState(false)

//   const [user, setUser] = useState()
//   const [loading, setLoading] = useState(true)

//   // fetch user friom database
//   const getCurrentUser = async () => {
//     try {
//       const user = await axios(`${BaseUrl}/isAuthenticated`, {
//         withCredentials: true,
//       })
//       if (user.status === 200) {
//         setUser(user.data)
//         setLoading(false)
//       }
//     } catch (error) {
//       console.log(error)
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     getCurrentUser()
//   }, [])

//   const navigate = useNavigate()

//   const register = async () => {
//     try {
//       const register = await axios.post(
//         `${BaseUrl}/users`,
//         {
//           nom,
//           prenom,
//           email,
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       )
//       if (register.status == 200) {
//         navigate("/profil")
//         window.location.reload()
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const login = async () => {
//     setCustomError(false)
//     try {
//       const loginState = await axios.post(
//         `${BaseUrl}/users/login`,
//         {
//           email,
//           password,
//         },
//         { withCredentials: true }
//       )
//       if (loginState.status === 200) {
//         navigate("/profil", { replace: true })
//       }
//     } catch (error) {
//       setCustomError(error.response.data.message)
//       console.log(error.response.data.message)
//     }
//   }

//   if (user) {
//     return <Profil />
//   }

//   return (
//     <div className="flex lg:flex-row flex-col justify-evenly items-center lg:px-4 lg:py-10 relative bg-black overflow-hidden">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 1438 320"
//         // width="1438"
//         // height="320"
//         className="absolute bottom-0  z-10 backdrop-blur-2xl blur-2xl w-screen"
//       >
//         <path
//           fill="#ffd700"
//           fillOpacity="0.7"
//           d="M0,32L60,53.3C120,75,240,117,360,117.3C480,117,600,75,720,85.3C840,96,960,160,1080,192C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
//         ></path>
//       </svg>

//       {/* image tourist */}
//       <div className="lg:self-start  justify-center flex z-20 relative">
//         <img
//           src="/images/tourist.png"
//           className="object-contain lg:w-[20rem] w-[96%]  lg:rounded-3xl"
//           alt=""
//         />
//       </div>

//       {/* login */}
//       <div className="flex flex-col items-center gap-6 z-20">
//         <div className="flex items-center">
//           <div className="bg-yellow-300 h-1 w-5 mx-2" />
//           <h2 className="text-2xl text-white">Se connecter</h2>
//           <div className="bg-yellow-300 h-1 w-5 mx-2" />
//         </div>

//         <button
//           role="button"
//           className="bg-white px-3 py-1 flex items-center gap-2 rounded-md"
//         >
//           <img src="/images/google.png" className="size-5" alt="" />
//           Continuer avec Gmail
//         </button>
//         <input
//           type="text"
//           className="bg-white shadow-md rounded-lg pl-3 py-1"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="bg-white shadow-md rounded-lg pl-3 py-1"
//           placeholder="Mot de passe"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {customError && <p className="text-red-600">{customError}</p>}
//         <button
//           onClick={login}
//           className="px-3 py-1 bg-yellow-300 rounded-md lg:mb-0 mb-5"
//         >
//           Connexion
//         </button>
//       </div>

//       {/* register */}

//       <div className="flex flex-col items-center gap-6 z-20">
//         <div className="flex items-center">
//           <div className="bg-yellow-300 h-1 w-5 mx-2" />
//           <h2 className="text-2xl text-white">S&apos;inscrire</h2>
//           <div className="bg-yellow-300 h-1 w-5 mx-2" />
//         </div>

//         <p className="text-white lg:max-w-80 max-w-[90%] text-center">
//           Inscrivez-vous gratuitement, et recevez toute l&apos;actualité des
//           bons plans sorties, et l&apos;agenda culturel, pour ne rien rater.
//         </p>
//         <input
//           type="text"
//           className="bg-white shadow-md rounded-lg pl-3 py-1"
//           placeholder="Prénom"
//           onChange={(e) => setPrenom(e.target.value)}
//         />
//         <input
//           type="text"
//           className="bg-white shadow-md rounded-lg pl-3 py-1"
//           placeholder="Nom"
//           onChange={(e) => setNom(e.target.value)}
//         />
//         <input
//           type="text"
//           className="bg-white shadow-md rounded-lg pl-3 py-1"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="bg-white shadow-md rounded-lg pl-3 py-1"
//           placeholder="Choisir un Mot de passe"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           className="bg-white shadow-md rounded-lg pl-3 py-1"
//           placeholder="Confirmer le Mot de passe"
//         />
//         <p className="text-white lg:max-w-60 max-w-[80%] text-center">
//           En créant un compte kherdja.com J&apos;accepte les
//           <a href="" className="text-yellow-300 ml-1">
//             Conditions d&apos;utilisation
//           </a>
//         </p>
//         <button
//           onClick={register}
//           className="px-3 py-1 bg-yellow-300 rounded-md lg:my-0 my-4"
//         >
//           Inscription
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Login


import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import BaseUrl from "../components/BaseUrl"
import Profil from "./Profil"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [customError, setCustomError] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Fetch user from database
  const getCurrentUser = async () => {
    try {
      const user = await axios(`${BaseUrl}/isAuthenticated`, {
        withCredentials: true,
      })
      if (user.status === 200) {
        setUser(user.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const registerSchema = Yup.object().shape({
    prenom: Yup.string().required("Prénom est requis"),
    nom: Yup.string().required("Nom est requis"),
    email: Yup.string().email("Email invalide").required("Email est requis"),
    password: Yup.string()
      .min(6, "Mot de passe doit contenir au moins 6 caractères")
      .required("Mot de passe est requis"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe doivent correspondre"
      )
      .required("Confirmation du mot de passe est requise"),
  })

  const formik = useFormik({
    initialValues: {
      prenom: "",
      nom: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const register = await axios.post(
          `${BaseUrl}/users`,
          {
            nom: values.nom,
            prenom: values.prenom,
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        )
        if (register.status === 200) {
          navigate("/profil")
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
      }
    },
  })

  const login = async () => {
    setCustomError(false)
    try {
      const loginState = await axios.post(
        `${BaseUrl}/users/login`,
        { email, password },
        { withCredentials: true }
      )
      if (loginState.status === 200) {
        navigate("/profil", { replace: true })
      }
    } catch (error) {
      setCustomError(error.response.data.message)
      console.log(error.response.data.message)
    }
  }

  if (user) {
    return <Profil />
  }

  return (
    <div className="flex lg:flex-row flex-col justify-evenly items-center lg:px-4 lg:py-10 relative bg-black overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1438 320"
        className="absolute bottom-0 z-10 backdrop-blur-2xl blur-2xl w-screen"
      >
        <path
          fill="#ffd700"
          fillOpacity="0.7"
          d="M0,32L60,53.3C120,75,240,117,360,117.3C480,117,600,75,720,85.3C840,96,960,160,1080,192C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>

      <div className="lg:self-start justify-center flex z-20 relative">
        <img
          src="/images/tourist.png"
          className="object-contain lg:w-[20rem] w-[96%] lg:rounded-3xl"
          alt=""
        />
      </div>

      {/* login */}
      <div className="flex flex-col items-center gap-6 z-20">
        <div className="flex items-center">
          <div className="bg-yellow-300 h-1 w-5 mx-2" />
          <h2 className="text-2xl text-white">Se connecter</h2>
          <div className="bg-yellow-300 h-1 w-5 mx-2" />
        </div>

        <button
          role="button"
          className="bg-white px-3 py-1 flex items-center gap-2 rounded-md"
        >
          <img src="/images/google.png" className="size-5" alt="" />
          Continuer avec Gmail
        </button>
        <input
          type="text"
          className="bg-white shadow-md rounded-lg pl-3 py-1"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="bg-white shadow-md rounded-lg pl-3 py-1"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />

        {customError && <p className="text-red-600">{customError}</p>}
        <button
          onClick={login}
          className="px-3 py-1 bg-yellow-300 rounded-md lg:mb-0 mb-5"
        >
          Connexion
        </button>
      </div>

      {/* register */}
      <div className="flex flex-col items-center gap-6 z-20">
        <div className="flex items-center">
          <div className="bg-yellow-300 h-1 w-5 mx-2" />
          <h2 className="text-2xl text-white">S&apos;inscrire</h2>
          <div className="bg-yellow-300 h-1 w-5 mx-2" />
        </div>

        <p className="text-white lg:max-w-80 max-w-[90%] text-center">
          Inscrivez-vous gratuitement, et recevez toute l&apos;actualité des
          bons plans sorties, et l&apos;agenda culturel, pour ne rien rater.
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            className="bg-white shadow-md rounded-lg pl-3 py-1"
            placeholder="Prénom"
            name="prenom"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.prenom}
          />
          {formik.touched.prenom && formik.errors.prenom ? (
            <div className="text-red-600">{formik.errors.prenom}</div>
          ) : null}

          <input
            type="text"
            className="bg-white shadow-md rounded-lg pl-3 py-1"
            placeholder="Nom"
            name="nom"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nom}
          />
          {formik.touched.nom && formik.errors.nom ? (
            <div className="text-red-600">{formik.errors.nom}</div>
          ) : null}

          <input
            type="text"
            className="bg-white shadow-md rounded-lg pl-3 py-1"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}

          <input
            type="password"
            className="bg-white shadow-md rounded-lg pl-3 py-1"
            placeholder="Choisir un Mot de passe"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600">{formik.errors.password}</div>
          ) : null}

          <input
            type="password"
            className="bg-white shadow-md rounded-lg pl-3 py-1"
            placeholder="Confirmer le Mot de passe"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-600">{formik.errors.confirmPassword}</div>
          ) : null}

          <p className="text-white lg:max-w-60 max-w-[80%] text-center">
            En créant un compte kherdja.com J&apos;accepte les
            <a href="" className="text-yellow-300 ml-1">
              Conditions d&apos;utilisation
            </a>
          </p>
          <button
            type="submit"
            className="px-3 py-1 bg-yellow-300 rounded-md lg:my-0 my-4"
          >
            Inscription
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
