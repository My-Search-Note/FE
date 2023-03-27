interface Props {
  text: string;
  color: string;
  onClick: () => void;
}

const MemoFormButton = (props: Props) => {
  const { text, onClick, color } = props;

  return (
    <button
      className={`w-2/5 h-10 text-white bg-${color}-500 hover:bg-${color}-600 focus:outline-none`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MemoFormButton;
