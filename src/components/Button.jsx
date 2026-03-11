const Button = ({ label, onChangeLight }) => {
  return (
    <button
      type="button"
      onClick={onChangeLight}
      style={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        zIndex: 10,
        border: "1px solid #ffffff66",
        borderRadius: "999px",
        background: "#111111cc",
        color: "#fff",
        padding: "0.6rem 1rem",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Light: {label}
    </button>
  )
}

export default Button
