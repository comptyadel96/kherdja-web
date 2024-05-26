import React from "react"


const generateRandomPosition = () => ({
  "--random-x": Math.random(),
  "--random-y": Math.random(),
})

const Sandstorm = () => {
  // Generate multiple particle elements
  const particles = Array.from({ length: 1000 }).map((_, index) => (
    <div
      key={index}
      className="particle"
      style={generateRandomPosition()}
    ></div>
  ))

  return <div className="sandstorm-container">{particles}</div>
}

export default Sandstorm
