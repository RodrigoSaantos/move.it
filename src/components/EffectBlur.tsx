import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"

export function EffectBlur(props) {
  const { isLevelUpModalOpen } = useContext(ChallengesContext);

  return (
    <div style={isLevelUpModalOpen ? { filter: 'blur(3px)' } : {}}  >
      {props.children}
    </div>
  )
};