import Image from 'next/image'

export default function home(){
  return(
    <main>
      <div className="flex flex-col h-screen">
        <div className="bg-red-200 p-4 text-center">
          <div className="absolute top-0 left-2 w-16 h-14">
            <Image src="https://placekitten.com/200/200" alt="Your Image" layout="fill" objectFit="cover" />
          </div>
          <span>**User** To-Do list</span>
          </div>
        <div className="flex-grow flex">
          <div className="flex bg-green-200 p-4 w-1/6">Div 2</div>
          <div className="flex bg-blue-200 p-4 w-5/6">Div 3</div>
        </div>
      </div>
    </main>
  )
}
