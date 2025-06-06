

const Button = ({ img, altText, text, isActive,onClick }) => {

  return (
    <button
      onClick={onClick}
      className={`button flex justify-center items-center border-0 rounded-[3rem] transition-all duration-150 cursor-pointer text-black py-[11px] px-[2.25rem] ${
        isActive
          ? "bg-gradient-to-br from-(--bg-pink) to-(--bg-color) text-white"
          : "bg-white text-black hover:bg-[--grey]"
      }`}
      type="button"
    >
      <img src={img} alt={altText} className="mr-2" />
      {text}
    </button>
  );
};

export default Button;
