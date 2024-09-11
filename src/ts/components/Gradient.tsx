import useChangeTheme  from "../hooks/useChangeTheme"

const Gradient: React.FC = () => {
  const { theme } = useChangeTheme();

  return (
    <div className={`w-100 h-[5vh] bg-gradient-to-b ${theme.gradPrimary} ${theme.gradSecondary}`}></div>
  )
}

export default Gradient