import NavbarContent from "./NavbarContent"

const Navbar = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex inset-0 h-full items-center z-1 ">
        <NavbarContent />
      </div>
    </div>
  )
}

export default Navbar