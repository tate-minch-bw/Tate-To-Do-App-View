export default function home(){
  return(
    <main>
      <div className="flex flex-col h-screen">
        <div className="bg-gradient-to-l from-black to-gray-600 p-4 text-left justify-between items-center">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white py-2 px-4 mb-2 font-poppins">TodoCentral</h1>
            <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
              <li className="mr-6 p-1 border-b-2 border-orange-500 hover:border-transparent">
                <a className="text-blue-200 cursor-pointer" href="https://github.com/tate-minch-bw/Tate-To-Do-App-View">Git Repo</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-grow flex">
          <div className="flex bg-gray-200 p-4 w-1/6 border-r border-gray-400">
            <div className="ml-4 flex flex-col">
              <h2 className="text-lg text-black font-medium mt-0 mb-2">User List</h2>
            </div>
          </div>
          <div className="flex bg-gray-300 p-4 w-5/6 text-center text-black">
            <span className= "mx-auto">&lt;USER&apos;s&gt; tasks</span>
          </div>
        </div>
      </div>
    </main>
  )
}
