import avatarLady from "../../assets/pets/avatar-lady.png";
import avatarTokio from "../../assets/pets/avatar-tokio.png";

const PET_IMAGES = {
  lady: avatarLady,
  tokio: avatarTokio,
};

export default function PetButton({ petId, ladyState, ladyTimer, onSend, onClaim }) {
  const handleClick =
    ladyState === "idle"
      ? onSend
      : ladyState === "ready"
      ? onClaim
      : null;

  const pulseClass = ladyState === "idle" ? "pet-idle" : ladyState === "ready" ? "pet-ready" : "";

  return (
    <button
      className={`btn-hud-lady ${pulseClass}`}
      disabled={ladyState === "searching"}
      onClick={handleClick}
    >
      <img src={PET_IMAGES[petId]} alt="Mascota" />
      {ladyState === "idle" && "Enviar"}
      {ladyState === "searching" && `Buscando... ${ladyTimer}s`}
      {ladyState === "ready" && "Reclamar"}
    </button>
  );
}
