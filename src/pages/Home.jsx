import { Generator } from "../components/Generator"

export default function Home() {
  return (
    <>
      <Generator.Root>
        <Generator.Output>22</Generator.Output>
        <Generator.Input />
        <Generator.Confirm>Confirmar</Generator.Confirm>
      </Generator.Root>
    </>
  )
}
