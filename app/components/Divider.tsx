interface DividerProps {
  horizontal?: boolean
}

const Divider = ({ horizontal = false }: DividerProps): JSX.Element => {
  return <div className={`divider after:bg-base-300 before:bg-base-300 ${horizontal ? 'mx-0 divider-horizontal' : 'my-0'}`} />
}

export default Divider
