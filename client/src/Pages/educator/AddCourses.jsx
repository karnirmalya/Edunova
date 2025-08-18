import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { assets } from "../../assets/assets";

function AddCourses() {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showPopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPopUp]);

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Title");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0
              ? chapters.slice(-1)[0].chapterOrder + 1
              : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopUp(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const updatedContent = chapter.chapterContent.filter(
              (_, i) => i !== lectureIndex
            );
            return { ...chapter, chapterContent: updatedContent };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureUrl) return;

    setChapters(
      chapters.map((chapter) =>{
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      }
        
      )
    );
setShowPopUp(false);
    
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <form onSubmit={handleChapter}   className="flex flex-col gap-4 max-w-md w-full text-gray-500">
        {/* Course Title */}
        <div className="flex flex-col gap-1 mb-4">
          <p>Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-1 mb-4">
          <p>Course Description</p>
          <div
            ref={editorRef}
            className="border border-gray-500 rounded min-h-[200px] p-2"
          ></div>
        </div>

        {/* Course Price & Thumbnail */}
        <div className="flex item-center justify-between flex-wrap ">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={`${coursePrice}`}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
            />
          </div>

          <div>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex item-center gap-3">
              <img
                src={assets.file_upload_icon}
                alt=""
                className="p-3 bg-blue-500 rounded"
              />
              <input
                type="file"
                id="thumbnailImage"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
              <img
                className="max-h-10"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={`${discount}`}
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Chapters */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-white border rounded-lg mb-4">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={assets.dropdown_icon}
                    alt=""
                    width={14}
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                  />
                  <span className="font-semibold">
                    {chapterIndex + 1}: {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1} {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        alt=""
                        className="cursor-pointer"
                        onClick={() =>
                          handleLecture("remove", chapter.chapterId, lectureIndex)
                        }
                      />
                    </div>
                  ))}
                  <div
                    className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            onClick={() => handleChapter("add")}
            className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer"
          >
            + Add Chapter
          </div>

          {/* Popup */}
          {showPopUp && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Background Blur */}
              <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

              {/* Popup Box */}
              <div className="relative bg-white text-gray-700 p-6 rounded-lg w-full max-w-96 shadow-2xl z-50">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>

                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p>Duration (minutes)</p>
                  <input
                    type="number"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <p>Is Preview Free?</p>
                  <input
                    type="checkbox"
                    className="scale-125"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={addLecture}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  
                >
                  Add
                </button>

                <img
                  onClick={() => setShowPopUp(false)}
                  src={assets.cross_icon}
                  alt="close"
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white w-max py-2.5 px-8 rounded my-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddCourses;