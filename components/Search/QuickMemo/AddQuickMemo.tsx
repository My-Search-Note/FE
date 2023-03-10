// import Tiptap from "../common/Tiptap";
import { useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";

type Props = {
  handleAddClick: () => void;
};

const AddNote = ({ handleAddClick }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const BASE_URL = "http://localhost:8080";

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `${BASE_URL}/memos`,
        {
          title: titleRef.current!.value,
          content: contentRef.current!.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleAddClick(); //뒤로가기
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className=" h-[calc(100%-2.5rem)]">
        <div className="h-12">
          <input
            type="text"
            className="h-10 w-full px-3 rounded-lg z-0 text-md shadow outline-none"
            placeholder="Title"
          />
        </div>
        <textarea
          className="w-full h-[calc(100%-3rem)] px-3 py-2 bg-gray-100 border-2 border-gray-200 rounded-md outline-none resize-none"
          ref={contentRef}
          placeholder="Type here"
        ></textarea>
      </div>
      <div className="flex p-2 justify-between">
        <button
          className="w-2/5 py-2 text-white bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
          onClick={handleAddClick}
        >
          Cancel
        </button>
        <button
          className="w-2/5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
