const Title: React.FC= () => {
  return (
    <div className="flex flex-row justify-between h-[15vh] text-white bg-indigo-600 text-4xl ">
      <h1 className="p-8">TYPETESTR</h1>
      <div className="text-4xl flex flex-row">

        <div className="relative group">
          <button className="p-8">Themes</button>
          <div className="absolute hidden group-hover:block bg-white text-black text-xl mt-2 rounded shadow-lg z-10">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-200"><button>Blue & grey</button></li>
              <li className="px-4 py-2 hover:bg-gray-200"><button>White & green</button></li>
              <li className="px-4 py-2 hover:bg-gray-200"><button></button>red & black</li>
            </ul>
          </div>
        </div>
        <button className="p-8">Settings</button>

      </div>
    </div>
  )
}

export default Title