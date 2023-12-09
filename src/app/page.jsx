'use client'
import { useState } from "react"


function AddCart(props) {
  return (
    <div className="flex flex-col bg-slate-900 rounded-lg p-1">
      <button
        type="button"
        onClick={() => props.onRemove(props.index)}
        className="self-end text-blue-500 rounded-lg p-1.5 hover:bg-blue-200 items-center justify-center dark:text-blue-400 dark:hover:bg-gray-700" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
      <div className="flex flex-col w-[200px] h-[200px] max-sm:w-[100px] max-sm:h-[100%] px-3 pb-2 overflow-auto scroll-smooth">
        <h2 className="font-semibold">{props.title}</h2>
        <p className="text-xs font-medium mt-1">{props.description}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [dataArr, setdataArr] = useState([])
  const [error, setError] = useState(false)
  const [formData, setformData] = useState({
    title: '',
    description: '',
  })

  const handleInput = (e) => {
    e.preventDefault();

    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submit = () => {
    if (formData.description !== "") {
      setdataArr([...dataArr, formData])
      setformData({
        title: '',
        description: '',
      })
      setError(false)
    } else {
      setError(true)
    };
  }

  const onRemove = (index) => {
    const newData = [...dataArr]
    newData.splice(index, 1)
    setdataArr(newData)
  };
  console.log(dataArr);
  return (
    <main className='flex justify-center w-full h-screen align-middle py-7 px-3'>
      <div className='flex flex-col h-full py-2 px-1'>
        <h1 className='text-3xl font-bold'>MeMo for you Remember</h1>
        <div className="flex gap-10 h-full mt-5 max-sm:flex-col">
          <div className="self-center">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your memo
            </label>
            <div className="bg-gray-50 border sm:w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <input
                type="text"
                name="title"
                id="default-input"
                value={formData.title}
                onChange={handleInput}
                className="bg-transparent border-b text-gray-900 text-sm w-full p-2.5 dark:placeholder-gray-400 dark:text-white outline-none"
                placeholder="Title"
              />
              <textarea
                id="message"
                name="description"
                rows="10"
                cols="50"
                value={formData.description}
                onChange={handleInput}
                className="block p-2.5 w-full bg-transparent text-sm text-gray-900 outline-none dark:placeholder-gray-400 dark:text-white" placeholder="What are you doing?..."
                required
              ></textarea>
            </div>
            <button
              onClick={submit}
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mt-2"
            >Add
            </button>
            {
              error && <span className="text-xs font-normal text-red-500">This fild cannot be empty</span>
            }

          </div>
          <div className="flex bg-slate-600 overflow-auto w-[670px] max-sm:h-full max-sm:w-full rounded-lg border border-gray-600 shadow-sm dark:shadow-slate-50">
            <div className="flex px-1 py-2 gap-1 flex-wrap h-fit w-full">
              {
                dataArr.map((data, i) => (
                  <AddCart
                    title={data.title}
                    description={data.description}
                    key={i}
                    index={i}
                    onRemove={onRemove}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
