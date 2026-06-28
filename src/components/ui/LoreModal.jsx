export default function LoreModal({ img, text, onContinue }) {
  return (
    <div className="lore-modal-overlay">
      <div className="lore-modal">
        <img src={img} className="lore-modal-img" alt="" />
        <p className="lore-modal-text">{text}</p>
        <button className="lore-modal-btn" onClick={onContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
}
