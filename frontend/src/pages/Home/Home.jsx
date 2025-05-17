import React, { useEffect, useState } from "react"
import NoteCard from "../../components/Cards/NoteCard"
import { MdAdd } from "react-icons/md"
import Modal from "react-modal"
import AddEditNotes from "./AddEditNotes"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import axios from "axios"
import { toast } from "react-toastify"
import EmptyCard from "../../components/EmptyCard/EmptyCard"
import baseUrl from "../../config/baseUrl"

const Home = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [userInfo, setUserInfo] = useState(null)
  const [allNotes, setAllNotes] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    } else {
      setUserInfo(currentUser?.rest)
      getAllNotes()
    }
  }, [])

  const getAllNotes = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/note/all`, {
        withCredentials: true,
      })

      if (!res.data.success) {
        toast.error(res.data.message)
        return
      }

      setAllNotes(res.data.notes)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
  }

  const deleteNote = async (data) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/note/delete/${data._id}`,
        { withCredentials: true }
      )

      if (!res.data.success) {
        toast.error(res.data.message)
        return
      }

      toast.success("Note deleted successfully!")
      getAllNotes()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get(`${baseUrl}/api/note/search`, {
        params: { query },
        withCredentials: true,
      })

      if (!res.data.success) {
        toast.error(res.data.message)
        return
      }

      setIsSearch(true)
      setAllNotes(res.data.notes)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false)
    getAllNotes()
  }

  const updateIsPinned = async (noteData) => {
    try {
      const res = await axios.put(
        `${baseUrl}/api/note/update-note-pinned/${noteData._id}`,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      )

      if (!res.data.success) {
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <main className="px-6 sm:px-10 lg:px-16 py-10 min-h-screen bg-gradient-to-b from-white via-slate-100 to-slate-200">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
                className="hover:scale-[1.03] transform transition-transform duration-300 shadow-lg hover:shadow-2xl rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-28">
            <EmptyCard
              imgSrc={
                isSearch
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtakcQoMFXwFwnlochk9fQSBkNYkO5rSyY9A&s"
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s"
              }
              message={
                isSearch
                  ? "Oops! No Notes found matching your search."
                  : "Ready to capture your ideas? Click the '+' button to start noting down your thoughts, inspiration, and reminders."
              }
            />
          </div>
        )}
      </main>

      <button
        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 w-16 h-16 flex items-center justify-center
          bg-gradient-to-tr from-blue-700 to-indigo-800 text-white rounded-full shadow-2xl
          hover:from-indigo-800 hover:to-blue-700
          active:scale-95
          transition-transform duration-300
          z-50"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
        aria-label="Add Note"
      >
        <MdAdd className="text-5xl drop-shadow-lg" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        contentLabel="Add/Edit Note Modal"
        className="max-w-xl w-[95%] max-h-[85vh] overflow-y-auto bg-white rounded-3xl p-10 shadow-2xl mx-auto mt-20 outline-none transition-all duration-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start pt-14 px-4"
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  )
}

export default Home
