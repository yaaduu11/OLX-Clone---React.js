type menuProp = {
  setMenu:any; 
}

const Menubar = (props:menuProp) => {
  return (
    <div className="flex h-10 p-2 shadow-sm">
      <h1 onClick={()=> props?.setMenu("")} className="ml-48 font-semibold cursor-pointer">All category</h1>
      <h1 onClick={()=> props?.setMenu("shirt")} className="ml-5 cursor-pointer">Shirt</h1>
      <h1 onClick={()=> props?.setMenu("jacket")} className="ml-5 cursor-pointer">Jacket</h1>
      <h1 onClick={()=> props?.setMenu("watch")} className="ml-5 cursor-pointer">Watch</h1>
      <h1 onClick={()=> props?.setMenu("phone")} className="ml-5 cursor-pointer">Mobile phones</h1>
      <h1 onClick={()=> props?.setMenu("House")} className="ml-5 cursor-pointer">House</h1>
      <h1 onClick={()=> props?.setMenu("Scooter")} className="ml-5 cursor-pointer">Scooters</h1>
      <h1 onClick={()=> props?.setMenu("Apartments")} className="ml-5 cursor-pointer">Apartments</h1>
    </div>
  )
}

export default Menubar