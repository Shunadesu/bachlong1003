import SearchInput from "../input/SearchInput"
import Link from "next/link"

const NavbarContent = () => {

  return (
    <div className="w-full flex justify-between items-center text-[13px] tracking-[3px] p-2">
        {/* Logo */}
        <div className="">
            <Link
                href={'/'}
                className="flex flex-col justify-center items-center tracking-[0px]"
            >
                <div className="w-[220px] h-[100px]">
                    <img
                    src="https://bachlongmobile.com/assets/images/logo/logo-website-1.png" 
                    alt="logo" 
                    className="w-full h-full object-contain"/>
                </div>
            </Link>
        </div>

        <div className=" flex justify-end gap-16 items-center">
            <Link href={'/product'}>
                PRODUCT
            </Link>

            <Link href={'/blog'}>
                BLOGS
            </Link>

            <Link href={'/support'}>
                SUPPORT
            </Link>
            
            <div className="">
                <SearchInput />
            </div>
        </div>
    </div>
  )
}

export default NavbarContent