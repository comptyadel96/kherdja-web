import React from "react"

function Login() {
  return (
    <div className="flex lg:flex-row flex-col justify-evenly items-center lg:px-4 lg:py-10 relative bg-black overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1438 320"
        // width="1438"
        // height="320"
        className="absolute bottom-0  z-10 backdrop-blur-2xl blur-2xl w-screen"
      >
        <path
          fill="#ffd700"
          fillOpacity="0.7"
          d="M0,32L60,53.3C120,75,240,117,360,117.3C480,117,600,75,720,85.3C840,96,960,160,1080,192C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>

      {/* image tourist */}
      <div className="self-start rounded-3xl z-20 relative">
        <img
          src="/images/tourist.png"
          className="object-contain lg:w-[20rem]"
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
        />
        <input
          type="password"
          className="bg-white shadow-md rounded-lg pl-3 py-1"
          placeholder="Mot de passe"
        />
        <button className="px-3 py-1 bg-yellow-300 rounded-md">
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

        <p className="text-white lg:max-w-80 text-center">
          Inscrivez-vous gratuitement, et recevez toute l’actualité des bons
          plans sorties, et l’agenda culturel, pour ne rien rater.
        </p>
        <input
          type="text"
          className="bg-white shadow-md rounded-lg pl-3 py-1"
          placeholder="Email"
        />
        <input
          type="password"
          className="bg-white shadow-md rounded-lg pl-3 py-1"
          placeholder="Choisir un Mot de passe"
        />
        <input
          type="password"
          className="bg-white shadow-md rounded-lg pl-3 py-1"
          placeholder="Confirmer le Mot de passe"
        />
        <p className="text-white lg:max-w-60 text-center">
          En créant un compte kherdja.com J’accepte les
          <a href="" className="text-yellow-300 ml-1">
            Conditions d&apos;utilisation
          </a>
        </p>
        <button className="px-3 py-1 bg-yellow-300 rounded-md">
          Inscription
        </button>
      </div>
    </div>
  )
}

export default Login
