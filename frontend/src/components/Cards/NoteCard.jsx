import React from "react";
import { FaTags } from "react-icons/fa6";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h6 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-sm tracking-wide">
            {title}
          </h6>
          <span className="text-xs text-green-700">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`cursor-pointer text-xl ${
            isPinned ? "text-[#2B85FF]" : "text-slate-400 hover:text-[#2B85FF]"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-sm text-slate-700 mt-2 line-clamp-3">{content}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-slate-500 flex flex-wrap gap-1">
          {tags.map((item, index) => (
            <span key={index} className="bg-slate-100 px-2 py-1 rounded-full">
              #{item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-lg">
          <MdCreate
            className="cursor-pointer hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="cursor-pointer hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
