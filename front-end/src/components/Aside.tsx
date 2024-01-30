export function Aside() {
  return (
    <aside className="sm:hidden flex flex-col items-center w-80 h-screen fixed left-0 top-0 bg-white border-r pt-16 border-borderCard">
      <h1 className="text-3xl font-semibold text-center">Detalhes</h1>

      <img
        src="https://akamai.sscdn.co/uploadfile/letras/fotos/d/9/1/f/d91ffd780a8bb8fb21d138399fd05e88-tb7.jpg"
        alt=""
        className="rounded-full w-56 h-56 object-cover"
      />

      <div className="flex flex-col items-center">
        <span className="text-xl font-semibold">Nome</span>
        <span>+55 99 9999-9999</span>
        <span>Profissão</span>
        <span>2024-05-05</span>
      </div>
    </aside>
  );
}
